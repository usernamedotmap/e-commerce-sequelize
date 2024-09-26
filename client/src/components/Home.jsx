import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Modal, Box, Button, TextField } from "@mui/material";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [modelOpen, setModelOpen] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    productImage: "",
    price: "",
    shortDescription: "",
    description: "",
    productUrl: "",
    category: "",
    tags: "",
  });

  const handleChage = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    toast.success("You have successfully logout");
    navigate("/login");
  };

  const handleOpenModal = () => setModelOpen(true);

  const handleCloseModal = () => setModelOpen(false);

  const handleSubmitProduct = async (e) => {
    e.preventDefault();
    setModelOpen(false);

    const updatedFormData = {
      ...formData,
      productImage: formData.productImage
        ? formData.productImage.split(",").map((item) => item.trim())
        : [],
      category: formData.category
        ? formData.category.split(",").map((item) => item.trim())
        : [],
      tags: formData.tags
        ? formData.tags.split(",").map((item) => item.trim())
        : [],
    };

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        "http://localhost:3000/api/v1/products/",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        toast.success("Adding Product", response.data);
        fetchProduct();
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      toast.error(errorMessage);
    }
  };

  const fetchProduct = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:3000/api/v1/products/",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setProducts(response.data.data);
    } catch (error) {
      setError("Failed to fetch products");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, []);

  const userType = localStorage.getItem("userType");
  

  return (
    <div className="page-wrapper">
      <header>
        <div className="logo">
          <img
            src="https://www.canakkalebienali.com/wp-content/uploads/2019/07/mahal_logo.jpg"
            alt="Logo"
            style={{ width: "70px" }}
          />
        </div>
        <nav className="nav-bar">
          <ul>
            {userType === '1' && (
              <li>
                <button onClick={handleOpenModal}>
                  <span className="icon-add">
                    <Plus />
                  </span>
                </button>
              </li>
            )}
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        </nav>
      </header>

      
        <Modal open={modelOpen} onClose={handleCloseModal}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              height: "80vh",
              width: 400,
              bgcolor: "pink",
              boxShadow: 24,
              p: 4,
              overflow: "auto",
              borderRadius: 2,
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              mb={2}
              sx={{ bgcolor: "pink" }}
            >
              <h2>Add Product</h2>
              <Button onClick={handleCloseModal} variant="text">
                <X />
              </Button>
            </Box>
            <form onSubmit={handleSubmitProduct}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                margin="normal"
                multiline
                value={formData.title}
                onChange={handleChage}
                required
              />
              <TextField
                fullWidth
                label="Product Image"
                name="productImage"
                type="file"
                margin="normal"
                multiline
                value={formData.productImage}
                onChange={handleChage}
                required
              />
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                margin="normal"
                value={formData.price}
                onChange={handleChage}
                InputProps={{ inputProps: { min: 0 } }}
                required
              />
              <TextField
                fullWidth
                type="text"
                label="Short Description"
                name="shortDescription"
                margin="normal"
                value={formData.shortDescription}
                onChange={handleChage}
                required
              />
              <TextField
                fullWidth
                type="text"
                label="Description"
                name="description"
                margin="normal"
                value={formData.description}
                onChange={handleChage}
              />
              <TextField
                fullWidth
                type="url"
                label="Product URL"
                name="productUrl"
                margin="normal"
                value={formData.productUrl}
                onChange={handleChage}
              />
              <TextField
                fullWidth
                type="text"
                label="Category"
                name="category"
                margin="normal"
                value={formData.category}
                onChange={handleChage}
              />
              <TextField
                fullWidth
                type="text"
                label="Tags"
                name="tags"
                margin="normal"
                value={formData.tags}
                onChange={handleChage}
              />
              <Button variant="contained" type="submit" sx={{ mt: 2 }}>
                Submit
              </Button>
            </form>
          </Box>
        </Modal>
      

      <div className="products-list">
        <h2 style={{ color: "black" }}>Products List</h2>
        {error && <p>{error}</p>}
        <div className="products-container">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product.id} className="product-card">
                <img
                  src={product.productImage}
                  alt={product.title}
                  style={{ width: "100%", height: "auto", borderRadius: "8px" }}
                />
                <h2>{product.title}</h2>
                <p>{product.shortDescription}</p>
                <p style={{ color: "gray" }}>${product.price}</p>
                <a
                  href={product.productUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Product
                </a>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
