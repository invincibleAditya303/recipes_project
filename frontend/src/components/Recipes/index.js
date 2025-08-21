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
    const lastPage = Math.ceil(recipes.length/10)

    if(page < lastPage) {
        setPage(prevPage => ({page: prevPage + 1}))
    }
  }

  const onClickPrev = () => {
    if (page > 1) {
        setPage(prevPage => ({page: prevPage + 1}))
    }
  }


  useEffect(() => {
    axios.defaults.baseURL = 'http://127.0.0.1:5000'
    axios.get(`/api/recipes?page=${page}&limit=${limit}`)
      .then(res => {
        setRecipes(res.data.data);
        setTotal(res.data.total);
      });
  }, [page, limit]);


  return (
    <div className="p-4">
      <TableContainer component={Paper}>
            <Table>
                <TableHead>
                <TableRow>
                    <TableCell><strong>Title</strong></TableCell>
                    <TableCell><strong>Cuisine</strong></TableCell>
                    <TableCell><strong>Rating</strong></TableCell>
                    <TableCell><strong>Total Time</strong></TableCell>
                    <TableCell><strong>Serves</strong></TableCell>
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
                    <TableCell>{recipe.title}</TableCell>
                    <TableCell>{recipe.cuisine}</TableCell>
                    <TableCell>
                        <ReactStars
                        count={5}
                        value={recipe.rating}
                        size={20}
                        isHalf={true}
                        edit={false}
                        activeColor="#ffd700"
                        />
                    </TableCell>
                    <TableCell>{recipe.totalTime}</TableCell>
                    <TableCell>{recipe.serves}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
        </TableContainer>
        <Drawer anchor="right" open={!!selectedRecipe} onClose={onClose}>
            <Box sx={{ width: 360, p: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>
                {/* Close button */}
                <Box sx={{ alignSelf: 'flex-end' }}>
                <IconButton onClick={onClose}>
                    <CloseIcon />
                </IconButton>
                </Box>

                {/* Title */}
                <Typography variant="h5" gutterBottom>
                {selectedRecipe.title}
                </Typography>
                {/* Cuisine */}
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                {selectedRecipe.cuisine}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Description */}
                <Typography variant="body1" paragraph>
                {selectedRecipe.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* Total Time (expandable) */}
                <Box>
                <Typography
                    variant="subtitle2"
                    sx={{ cursor: 'pointer' }}
                    onClick={() => setExpanded((prev) => !prev)}
                >
                    Total Time: {selectedRecipe.totalTime} {expanded ? '▲' : '▼'}
                </Typography>
                <Collapse in={expanded}>
                    <Typography variant="body2">
                    {/* Example expanded info */}
                    Cook Time: {selectedRecipe.cookTime} • Prep Time: {selectedRecipe.prepTime}
                    </Typography>
                </Collapse>
                </Box>

                <Divider sx={{ my: 2 }} />

                {/* Nutrients */}
                <Box sx={{ mt: 2 }}>
                <Typography variant="subtitle2">Nutrients:</Typography>
                {selectedRecipe.nutrients && Object.entries(selectedRecipe.nutrients).map(([key, value]) => (
                    <Typography key={key} variant="body2">
                    • {key}: {value}
                    </Typography>
                ))}
                </Box>
            </Box>
      </Drawer>
      <Pagination onClickNext={onClickNext} onClickPrev={onClickPrev} />
      {recipes.length === 0 && <div>No results found</div>}
    </div>
  );
};

export default Recipes