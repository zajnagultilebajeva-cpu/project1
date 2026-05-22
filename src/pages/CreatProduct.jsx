import React, { useState } from 'react';
import { Button, TextField, Box, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const CreateProduct = () => {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [brand, setBrand] = useState('');
  const [image, setImage] = useState('');

  const navigate = useNavigate();

  const handleCreateProduct = () => {
    if (!title || !price || !description || !image) {
      toast.error("Баарын толтур!");
      return;
    }

    const newProduct = {
      id: Date.now(),
      title,
      price: Number(price),
      description,
      brand,
      images: [image]
    };

    const oldData = JSON.parse(localStorage.getItem("kepkaData")) || [];

    const updatedData = [...oldData, newProduct];

    localStorage.setItem("kepkaData", JSON.stringify(updatedData));

    // MainPage refresh үчүн
    window.dispatchEvent(new Event("product-added"));

    toast.success("Продукт кошулду!");
    navigate("/");
  };

  return (
        <Paper
            elevation={6}
            sx={{
                maxWidth: 520,
                margin: '40px auto',
                p: 4,
                borderRadius: 3
            }}
            >
      <Typography variant="h5" mb={2}>
        Create Product
      </Typography>

      <Box display="flex" flexDirection="column" gap={2}>

        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <TextField
          label="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <TextField
          label="Brand"
          value={brand}
          onChange={(e) => setBrand(e.target.value)}
        />

        <TextField
          label="Image URL"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />

        <TextField
          label="Description"
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Button
          variant="contained"
          color="success"
          onClick={handleCreateProduct}
        >
          Create
        </Button>

      </Box>
    </Paper>
  );
};

export default CreateProduct