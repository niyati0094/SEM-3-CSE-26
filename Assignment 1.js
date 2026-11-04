const express = require("express");

const app = express();
const PORT = 3000;


app.use(express.json());


let products = [
    {
        id: 1,
        name: "Laptop",
        category: "Electronics",
        price: 56000,
        quantity: 11
    },
    {
        id: 2,
        name: "Mobile Phone",
        category: "Electronics",
        price: 26000,
        quantity: 21
    },
    {
        id: 3,
        name: "Keyboard",
        category: "Accessories",
        price: 1400,
        quantity: 16
    }
];



app.get("/products", (req, res) => {
    res.json(products);
});
app.get("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});


app.post("/products", (req, res) => {
    const { name, category, price, quantity } = req.body;

    if (!name || !category || price === undefined || quantity === undefined) {
        return res.status(400).json({
            message: "All product fields are required"
        });
    }

    const newProduct = {
        id: products.length > 0
            ? products[products.length - 1].id + 1
            : 1,
        name: name,
        category: category,
        price: price,
        quantity: quantity
    };

    products.push(newProduct);

    res.status(201).json({
        message: "Product added successfully",
        product: newProduct
    });
});



app.put("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const product = products.find(p => p.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, category, price, quantity } = req.body;

    product.name = name ?? product.name;
    product.category = category ?? product.category;
    product.price = price ?? product.price;
    product.quantity = quantity ?? product.quantity;

    res.json({
        message: "Product updated successfully",
        product: product
    });
});

app.delete("/products/:id", (req, res) => {
    const id = parseInt(req.params.id);

    const index = products.findIndex(p => p.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const deletedProduct = products.splice(index, 1);

    res.json({
        message: "Product deleted successfully",
        product: deletedProduct[0]
    });
});

app.get("/products/category/:category", (req, res) => {
    const category = req.params.category;

    const filteredProducts = products.filter(
        p => p.category.toLowerCase() === category.toLowerCase()
    );

    if (filteredProducts.length === 0) {
        return res.status(404).json({
            message: "No products found in this category"
        });
    }

    res.json(filteredProducts);
});


app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});