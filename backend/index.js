const express = require('express')
const app = express()
const fs = require('fs')
const cors = require('cors')
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())

require('dotenv').config()

const filePath = 'C:/Users/Gigleaz/Downloads/US_recipes.json'

const {MongoClient} = require('mongodb')
const uri = 'mongodb+srv://ammuaditya303:j95fCqhpotEWXqqf@cluster0.67stb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
const client = new MongoClient(uri)

//connecting to the server
const connectToSever = async () => {
  try {
    await client.connect()
    console.log('Connected to MongoDB')
  } catch (error) {
    console.log(`Connection failed: ${error}`)
  }
}

connectToSever()

//listening on the port
app.listen(PORT, () => {
  console.log('Server listening on http://localhost:5000')
})

const db = client.db('recipes_database')

const insertRecipes = async () => {
  try {
    let rawData = fs.readFileSync(filePath, 'utf8');

    if (rawData) {
      rawData = rawData.replace(/NaN/g, 'null');
    }
    
    const data = JSON.parse(rawData);
    Object.values(data).forEach(recipe => {
    recipe.rating = isNaN(recipe.rating) ? null : recipe.rating;
    recipe.prep_time = isNaN(recipe.prep_time) ? null : recipe.prep_time;
    recipe.cook_time = isNaN(recipe.cook_time) ? null : recipe.cook_time;
    recipe.total_time = isNaN(recipe.total_time) ? null : recipe.total_time;
    });
    
    if (await db.collection('recipes').countDocuments({}) === 0) {
      const result =  await db.collection('recipes').insertMany(Object.values(data));
      initialDataInserted = true;
      console.log(`${result.insertedCount} recipes were inserted`);
    }
  } catch (err) {
    console.error('Error reading or parsing file:', err);
  }
}

insertRecipes()

//GET all recipes
app.get('/api/recipes', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  const recipes = await db.collection('recipes')
    .find()
    .sort({ rating: -1 })
    .skip(skip)
    .limit(limit)
    .toArray();
  const total = await db.collection('recipes').countDocuments();
  res.json({ page, limit, total, data: recipes });
})

//GET serached recipes
app.get('/api/recipes/search', async (req, res) => {
  try {
    const filters = {};

    const operatorMap = {
      '=': '$eq',
      '!=': '$ne',
      '>': '$gt',
      '>=': '$gte',
      '<': '$lt',
      '<=': '$lte',
  };


    Object.entries(req.query).forEach(([key, value]) => {
      const decodedKey = decodeURIComponent(key)
      const decodedValue = decodeURIComponent(value)
      console.log(decodedValue)

      if (decodedValue.includes(',')) {
        // Handle range queries (e.g., calories=100,200)
        const [min, max] = value.split(',').map(Number);
        filters[decodedKey] = { $gte: min, $lte: max };
      } else {
        // Handle specific operators (e.g., calories<=400)
        const operator = Object.values(operatorMap).find(op => decodedKey.endsWith(op.slice(1, op.length)));
        console.log(operator)
      
        if (operator) {
          const field = decodedKey.slice(0, -operator.length);
          const numberValue = parseFloat(decodedValue);
          filters[field] = { [operatorMap[operator]]: numberValue };
        } else {
          // Default to exact match if no operator is specified
          filters[decodedKey] = decodedValue;
        }
      }
    });

    console.log(filters)

    // Fetch filtered recipes
    const recipes = await db.collection('recipes').find(filters).toArray();

    // Return the filtered recipes
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'An error occurred while fetching recipes' });
  }
});

