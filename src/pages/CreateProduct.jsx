import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, Typography, Paper, MenuItem, Grid, Fade, InputAdornment, IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import TitleIcon from '@mui/icons-material/Title';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; 
import '../styles/CreatePage.css'
import 'react-toastify/dist/ReactToastify.css'

const CreateProduct = () => {
  const [title, setTitle] = useState(() => localStorage.getItem('p_title') || '');
  const [price, setPrice] = useState(() => localStorage.getItem('p_price') || '');
  const [description, setDescription] = useState(() => localStorage.getItem('p_description') || '');
  const [brand, setBrand] = useState(() => localStorage.getItem('p_brand') || '');
  const [category, setCategory] = useState(() => localStorage.getItem('p_category') || 'All');
  
  const [image1, setImage1] = useState(() => localStorage.getItem('p_image1') || '');
  const [image2, setImage2] = useState(() => localStorage.getItem('p_image2') || '');
  const [image3, setImage3] = useState(() => localStorage.getItem('p_image3') || '');

  const navigate = useNavigate()
  
  useEffect(() => {
    localStorage.setItem('p_title', title);
    localStorage.setItem('p_price', price);
    localStorage.setItem('p_description', description);
    localStorage.setItem('p_brand', brand);
    localStorage.setItem('p_category', category);
    localStorage.setItem('p_image1', image1);
    localStorage.setItem('p_image2', image2);
    localStorage.setItem('p_image3', image3);
  }, [title, price, description, brand, category, image1, image2, image3]);

  const clearFormAndStorage = () => {
    const keys = ['p_title', 'p_price', 'p_description', 'p_brand', 'p_category', 'p_image1', 'p_image2', 'p_image3'];
    keys.forEach(key => localStorage.removeItem(key));
    
    setTitle('');
    setPrice('');
    setDescription('');
    setBrand('');
    setCategory('All');
    setImage1('');
    setImage2('');
    setImage3('');
  };

  // 🔥 LOCALSTORAGE-ГО ТОВАР КОШУУ (CREATE)
  const handleCreateProduct = () => {
    if (!title || !price || !description || !brand || !image1) {
      toast.error("Негизги талааларды толтуруңуз!")
      return;
    }

    try {
      const imagesArray = [image1];
      if (image2) imagesArray.push(image2);
      if (image3) imagesArray.push(image3);

      // Маалымат объектиси
      const newProduct = {
        id: "prod_" + Date.now(), // Ар бир товарга кайталанбас ID түзөбүз
        title,
        price: Number(price),
        description,
        brand,
        category,
        images: imagesArray,
        createdAt: new Date().toISOString()
      };

      // Эски кошулган товарларды алып, үстүнө жаңысын кошобуз
      const existingProducts = JSON.parse(localStorage.getItem("local_products")) || [];
      const updatedProducts = [newProduct, ...existingProducts];
      
      // Кайра LocalStorage-го сактайбыз
      localStorage.setItem("local_products", JSON.stringify(updatedProducts));

      toast.success("Товар ийгиликтүү кошулду! ")
      clearFormAndStorage() 
      setTimeout(() => navigate("/"), 1000); 
    } catch (err) {
      console.error(err);
      toast.error("Ката кетти, кайра аракет кылыңыз.");
    }
  }

  return (
    <Box className="create-product-container">
      <Fade in={true} timeout={1000}>
        <Paper elevation={0} className="product-paper" sx={{ position: 'relative' }}>
          
          <IconButton 
            onClick={() => navigate("/")} 
            sx={{ position: 'absolute', top: 5, left: 20, color: '#4f46e5' }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box mb={4} textAlign="center">
            <Typography variant="h4" className="form-title">
              Товар кошуу
            </Typography>
          </Box>

          <Box display="flex" flexDirection="column" gap={3}>
            
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={8}>
                <TextField 
                  fullWidth 
                  label="Аталышы" 
                  className="modern-input"
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)} 
                  InputProps={{ startAdornment: <InputAdornment position="start"><TitleIcon color="action" /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField 
                  fullWidth 
                  label="Баасы" 
                  type="number" 
                  className="modern-input"
                  value={price} 
                  onChange={(e) => setPrice(e.target.value)} 
                  InputProps={{ startAdornment: <InputAdornment position="start"><AttachMoneyIcon color="action" /></InputAdornment> }}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2.5}>
              <Grid item xs={12} sm={6}>
                <TextField 
                  fullWidth 
                  label="Бренди" 
                  className="modern-input"
                  value={brand} 
                  onChange={(e) => setBrand(e.target.value)} 
                  InputProps={{ startAdornment: <InputAdornment position="start"><BrandingWatermarkIcon color="action" /></InputAdornment> }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  fullWidth
                  label="Категория"
                  value={category}
                  className="modern-input"
                  onChange={(e) => setCategory(e.target.value)}
                  InputProps={{ startAdornment: <InputAdornment position="start"><CategoryIcon color="action" /></InputAdornment> }}
                >
                  <MenuItem value="All">Баары</MenuItem>
                  <MenuItem value="Men">Эркек кишилер үчүн</MenuItem>
                  <MenuItem value="Women">Аялдар үчүн</MenuItem>
                  <MenuItem value="Kids">Жаш балдар үчүн</MenuItem>
                </TextField>
              </Grid>
            </Grid>

            <Typography variant="subtitle2" sx={{ color: '#4f46e5', fontWeight: '700', mb: -1, mt: 1, fontFamily: '"Montserrat", sans-serif'}}>
              Сүрөт кошуу(URL)
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth  className="modern-input" value={image1} onChange={(e) => setImage1(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon color="action" /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth className="modern-input" value={image2} onChange={(e) => setImage2(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon color="action" /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth  className="modern-input" value={image3} onChange={(e) => setImage3(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon color="action" /></InputAdornment> }} />
              </Grid>
            </Grid>

            {(image1 || image2 || image3) && (
              <Box className="preview-box">
                {[image1, image2, image3].map((img, index) => img && (
                  <Box key={index} component="img" src={img} alt={`preview-${index}`} className="preview-image" />
                ))}
              </Box>
            )}
            <TextField
              label="Түшүндүрмө"
              multiline
              rows={4}
              fullWidth
              className="modern-input"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              InputProps={{ startAdornment: <InputAdornment position="start" sx={{ alignSelf: 'flex-start', mt: 1.5 }}><DescriptionIcon color="action" /></InputAdornment> }}
            />

            <Grid container justifyContent="center" style={{ marginTop: '10px' }}>
              <Grid item xs={12} sm={8}>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth
                  onClick={handleCreateProduct}
                  endIcon={<RocketLaunchIcon />}
                  className="submit-btn"
                >
                  Кошуу
                </Button>
              </Grid>
            </Grid>
          </Box>
          <ToastContainer position="top-center" autoClose={2000} />
        </Paper>
      </Fade>
    </Box>
  );
};

export default CreateProduct;