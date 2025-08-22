import { useState, useEffect } from 'react';
import axios from 'axios';
import ReactStars from 'react-rating-stars-component';

import {Drawer,
  Box,
  Typography,
  Divider,
  IconButton,
  Collapse,
    TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper, } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close'

import Pagination from '../Pagination'

const Recipes = ({onClose}) => {
  const [recipes, setRecipes] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [expanded, setExpanded] = useState(false)

  const onClickNext = () => {
    const lastPage = Math.ceil(total/10)

    if(page < lastPage) {
        setPage(prevPage => prevPage + 1)
    }
  }

  const onClickPrev = () => {
    if (page > 1) {
        setPage(prevPage => prevPage - 1)
    }
  }

  const onChangeLimit = event => {
    setLimit(Number(event.target.value));
  }


  useEffect(() => {
    axios.defaults.baseURL = 'http://127.0.0.1:5000'
    axios.get(`/api/recipes?page=${page}&limit=${limit}`)
      .then(res => {
        const items = res.data
        console.log(items)
        setRecipes(items.data);
        setTotal(items.total);
      }).catch(err => console.error(err));
  }, [page, limit]);


  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <div className="overflow-x-auto mb-4">
        <TableContainer component={Paper}>
              <Table className="min-w-full bg-white shadow-md rounded-lg">
                  <TableHead className="bg-gray-100" >
                  <TableRow>
                      <TableCell className="px-4 py-2 font-semibold"><strong>Title</strong></TableCell>
                      <TableCell className="px-4 py-2 font-semibold"><strong>Cuisine</strong></TableCell>
                      <TableCell className="px-4 py-2 font-semibold"><strong>Rating</strong></TableCell>
                      <TableCell className="px-4 py-2 font-semibold"><strong>Total Time</strong></TableCell>
                      <TableCell className="px-4 py-2 font-semibold"><strong>Serves</strong></TableCell>
                  </TableRow>
                  </TableHead>
                  <TableBody>
                    {recipes.map(recipe => (
                        <TableRow
                        key={recipe.id}
                        hover
                        onClick={() => setSelectedRecipe(recipe)}
                        style={{ cursor: 'pointer' }}
                        >
                        <TableCell className="px-4 py-2">{recipe.title}</TableCell>
                        <TableCell className="px-4 py-2">{recipe.cuisine}</TableCell>
                        <TableCell className="px-4 py-2">
                            <ReactStars
                            count={5}
                            value={recipe.rating}
                            size={20}
                            isHalf={true}
                            edit={false}
                            activeColor="#ffd700"
                            />
                        </TableCell>
                        <TableCell className="px-4 py-2">{recipe.totalTime}</TableCell>
                        <TableCell className="px-4 py-2">{recipe.serves}</TableCell>
                        </TableRow>
                    ))}
                  </TableBody>
              </Table>
        </TableContainer>
      </div>
        <Drawer anchor="right" open={!!selectedRecipe} onClose={onClose} >
          <Box sx={{ width: 360, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Close button */}
                <Box sx={{ alignSelf: 'flex-end' }}>
                  <IconButton onClick={onClose}>
                      <CloseIcon />
                  </IconButton>
                </Box>

                {/* Title */}
                {selectedRecipe &&
                <Typography variant="h5" lassName="text-2xl font-bold mb-2" gutterBottom>
                  {selectedRecipe.title}
                </Typography>
                }

                {/* Cuisine */}
                {selectedRecipe &&
                <Typography variant="subtitle1" className="text-gray-600 mb-4" color="textSecondary" gutterBottom>
                  {selectedRecipe.cuisine}
                </Typography>
                }

                <Divider sx={{ my: 2 }} />

                {/* Description */}
                {selectedRecipe &&
                <Typography variant="body1" className="text-gray-700 whitespace-pre-wrap mb-4">
                  {selectedRecipe.description}
                </Typography>
                }

                <Divider sx={{ my: 2 }} />

                {/* Total Time (expandable) */}
                <Box>
                  {selectedRecipe &&
                  <Typography
                      variant="subtitle2"
                      sx={{ cursor: 'pointer' }}
                      onClick={() => setExpanded((prev) => !prev)}
                      className="text-blue-600 hover:underline focus:outline-none mb-1"
                  >
                      Total Time: {selectedRecipe.totalTime} {expanded ? '▲' : '▼'}
                  </Typography>
                  }
                  {selectedRecipe &&
                  <Collapse in={expanded}>
                      <Typography variant="body2" className="text-gray-700">
                        {/* Example expanded info */}
                        Cook Time: {selectedRecipe.cookTime} • Prep Time: {selectedRecipe.prepTime}
                      </Typography>
                  </Collapse>
                  }
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Nutrients */}
                {selectedRecipe &&
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" className="font-semibold mb-2">Nutrients:</Typography>
                  {selectedRecipe.nutrients && Object.entries(selectedRecipe.nutrients).map(([key, value]) => (
                    <Typography key={key} variant="body2">
                      • {key}: {value}
                    </Typography>
                  ))}
                </Box>
                }
        </Box>
      </Drawer>
      <Pagination page={page} total={total} onClickNext={onClickNext} onClickPrev={onClickPrev} />
      <div className="flex items-center mb-4 space-x-2">
        <label htmlFor="limit-select" className="font-medium">
          Items per page:
        </label>
        <select
          id="limit-select"
          value={limit}
          onChange={onChangeLimit}
          className="border rounded px-2 py-1"
        >
          {[5, 10, 15, 20, 30].map(val => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
      </div>
      {recipes.length === 0 && <div>No results found</div>}
    </div>
  );
};

export default Recipes