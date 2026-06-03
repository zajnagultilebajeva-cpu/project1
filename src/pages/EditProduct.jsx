import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button, TextField, Box, Typography, Paper, MenuItem, Grid, Fade, InputAdornment, IconButton } from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import TitleIcon from '@mui/icons-material/Title';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import CategoryIcon from '@mui/icons-material/Category';
import ImageIcon from '@mui/icons-material/Image';
import DescriptionIcon from '@mui/icons-material/Description';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowBackIcon from '@mui/icons-material/ArrowBack'; // Артка кайтуу баскычы үчүн
import 'react-toastify/dist/ReactToastify.css';
import '../styles/CreatePage.css' // Крит барагынын стили колдонулат

export default function EditProduct() {
  const { id } = useParams(); 
  const navigate = useNavigate();

  // 1. Стейттерди баштапкы деңгээлде бош же черновик катары түзөбүз
  const [title, setTitle] = useState(() => localStorage.getItem(`edit_title_${id}`) || "");
  const [price, setPrice] = useState(() => localStorage.getItem(`edit_price_${id}`) || "");
  const [description, setDescription] = useState(() => localStorage.getItem(`edit_description_${id}`) || "");
  const [brand, setBrand] = useState(() => localStorage.getItem(`edit_brand_${id}`) || "");
  const [category, setCategory] = useState(() => localStorage.getItem(`edit_category_${id}`) || "All");
  
  const [image1, setImage1] = useState(() => localStorage.getItem(`edit_image1_${id}`) || "");
  const [image2, setImage2] = useState(() => localStorage.getItem(`edit_image2_${id}`) || "");
  const [image3, setImage3] = useState(() => localStorage.getItem(`edit_image3_${id}`) || "");

  // 🛠️ МААЛЫМАТТАРДЫ АВТОМАТТЫК ТҮРДӨ ТОЛТУРУУ (LOCALSTORAGE'ДАН ИЗДӨӨ)
  useEffect(() => {
    // Жалпы товарлардын тизмесин алабыз
    const allProducts = JSON.parse(localStorage.getItem("local_products")) || [];
    
    // Ошол тизмеден бизге керек болгон ID'деги товарды табабыз
    const currentProduct = allProducts.find(p => p.id?.toString() === id?.toString());

    if (currentProduct) {
      // Эгер черновикте (localStorage) сакталган маалымат жок болсо, товардын өзүнүн маалыматын коёбуз
      if (!localStorage.getItem(`edit_title_${id}`)) setTitle(currentProduct.title || currentProduct.name || "");
      if (!localStorage.getItem(`edit_price_${id}`)) setPrice(currentProduct.price || "");
      if (!localStorage.getItem(`edit_description_${id}`)) setDescription(currentProduct.description || "");
      if (!localStorage.getItem(`edit_brand_${id}`)) setBrand(currentProduct.brand || "");
      if (!localStorage.getItem(`edit_category_${id}`)) setCategory(currentProduct.category || "All");
      
      // Сүрөттөрдү текшерүү (массив же жөнөкөй string болушу мүмкүн)
      if (currentProduct.images && Array.isArray(currentProduct.images)) {
        if (!localStorage.getItem(`edit_image1_${id}`)) setImage1(currentProduct.images[0] || "");
        if (!localStorage.getItem(`edit_image2_${id}`)) setImage2(currentProduct.images[1] || "");
        if (!localStorage.getItem(`edit_image3_${id}`)) setImage3(currentProduct.images[2] || "");
      } else if (currentProduct.image) {
        if (!localStorage.getItem(`edit_image1_${id}`)) setImage1(currentProduct.image || "");
      }
    } else {
      toast.error("Мындай товар табылган жок!");
    }
  }, [id]);

  // Колдонуучу жазып жаткан учурда черновикке сактап туруу
  useEffect(() => {
    localStorage.setItem(`edit_title_${id}`, title);
    localStorage.setItem(`edit_price_${id}`, price);
    localStorage.setItem(`edit_description_${id}`, description);
    localStorage.setItem(`edit_brand_${id}`, brand);
    localStorage.setItem(`edit_category_${id}`, category);
    localStorage.setItem(`edit_image1_${id}`, image1);
    localStorage.setItem(`edit_image2_${id}`, image2);
    localStorage.setItem(`edit_image3_${id}`, image3);
  }, [title, price, description, brand, category, image1, image2, image3, id]);

  const clearLocalStorage = () => {
    const keys = [`edit_title_${id}`, `edit_price_${id}`, `edit_description_${id}`, `edit_brand_${id}`, `edit_category_${id}`, `edit_image1_${id}`, `edit_image2_${id}`, `edit_image3_${id}`];
    keys.forEach(key => localStorage.removeItem(key));
  };

  // 🛠️ ӨЗГӨРҮҮЛӨРДҮ LOCALSTORAGE-ГО САКТОО (UPDATE)
  const handleUpdate = () => {
    if (!title || !price || !description || !brand || !image1) {
      toast.error("Негизги талааларды толтуруңуз!");
      return;
    }

    try {
      const imagesArray = [image1];
      if (image2) imagesArray.push(image2);
      if (image3) imagesArray.push(image3);

      // Бардык товарларды алып келебиз
      const allProducts = JSON.parse(localStorage.getItem("local_products")) || [];
      
      // Массивдин ичинен эски товарды таап, анын маалыматтарын жаңылайбыз
      const updatedProducts = allProducts.map(p => {
        if (p.id?.toString() === id?.toString()) {
          return {
            ...p, // эски кошумча маалыматтары (мисалы, id) сакталат
            title,
            price: Number(price),
            description,
            brand,
            category,
            images: imagesArray,
            image: image1 // Эски кодуңуз менен коопсуз иштеш үчүн жалгыз сүрөттү да жаңыртып коёбуз
          };
        }
        return p; // калган товарларга тийбейбиз
      });

      // Жаңыланган массивди кайра Локалдык сактагычка жазабыз
      localStorage.setItem("local_products", JSON.stringify(updatedProducts));
      
      toast.success("Товар ийгиликтүү өзгөрдү!");
      clearLocalStorage();

      // Навигацияны башкы бетке ("/") багыттайбыз, анткени бизде азыр башкы бет маанилүү
      setTimeout(() => navigate("/"), 1300);
    } catch (err) {
      console.error(err);
      toast.error("Сактоодо ката кетти!");
    }
  };

  return (
    <Box className="create-product-container">
      <Fade in={true} timeout={1000}>
        <Paper elevation={0} className="product-paper" sx={{ position: 'relative' }}>
          
          {/* Артка кайтуу баскычы (Криттегидей) */}
          <IconButton 
            onClick={() => navigate("/")} 
            sx={{ position: 'absolute', top: 5, left: 20, color: '#4f46e5' }}
          >
            <ArrowBackIcon />
          </IconButton>
          
          <Box mb={4} textAlign="center">
            <Typography variant="h4" className="form-title">
              Өзгөртүү панели
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
              Сүрөттөр (URL)
            </Typography>
            
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField fullWidth className="modern-input" value={image1} onChange={(e) => setImage1(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon color="action" /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth className="modern-input" value={image2} onChange={(e) => setImage2(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon color="action" /></InputAdornment> }} />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField fullWidth className="modern-input" value={image3} onChange={(e) => setImage3(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><ImageIcon color="action" /></InputAdornment> }} />
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

              <Grid item xs={12} sm={8}>
                <Button 
                  variant="contained" 
                  size="large" 
                  fullWidth
                  onClick={handleUpdate}
                  className="submit-btn"
                >
                  Өзгөртүү
                </Button>
              
            </Grid>
          </Box>
          <ToastContainer position="top-center" autoClose={2000} />
        </Paper>
      </Fade>
    </Box>
  );
}