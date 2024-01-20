
window.onload = function() {
    const detailContainer = document.getElementById('detail-container');


    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    const productName = urlParams.get('name');
    const productPrice = urlParams.get('price');
    const productCategory = urlParams.get('category');


    function getProductDetails(id, name, price, category) {
        const product = generateProductDetails(id, name, price, category);
        return product;
    }


    function generateProductDetails(id, name, price, category) {
        const productDetails = {
            id: id,
            name: name,
            price: price,
            category: category,
            imgUrl: `images/productsImg/products${id}.png`,
            description: `This is the detailed description for demo${id}.`
        };

        return productDetails;
    }


    const productDetails = getProductDetails(productId, productName, productPrice, productCategory);


    const detailElement = document.createElement('div');
    detailElement.className = 'detail-item';

    detailElement.innerHTML = `
        <div class="img-box">
            <img src="${productDetails.imgUrl}" alt="">
        </div>
        <div class="paragraph-box">
            <p class="brand">FEAR OF GOD</p>
            <p class="cloth">${productDetails.name}</p>
            <p class="price">&#8361;${productDetails.price}</p>
            <p class="category">${productDetails.category}</p>
            <p class="description">${productDetails.description}</p>
        </div>
    `;

    detailContainer.appendChild(detailElement);
};
