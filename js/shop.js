
import { productInfo } from './productsInfo.js';
// import productInfo from './productInfo.json';


const pageItems = 15;

const generateProducts = (products, category, currentPage) => {
    const itemContainer = document.getElementById('items');
    let itemElement; // itemElement 변수를 함수 외부에 선언

    console.log('itemContainer', itemContainer);

    // 페이지네이션 변수
    const startIndex = (currentPage - 1) * pageItems;
    const endIndex = startIndex + pageItems;
    if (category === 'SHOP_ALL') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => !category || product.category === category);
    }
    const displayedProducts = filteredProducts.slice(startIndex, endIndex);

    displayedProducts.forEach(product => {
        itemElement = document.createElement('div');
        itemElement.className = 'item';

        itemElement.innerHTML = `
                  <div class="img-box">
                    <a href="/detail.html?id=${product.id}&name=${product.name}&category=${category}&price=${product.price}"><img src="${product.imgUrl}" alt=""></a>
                </div>
            <div class="paragraph-box">
                <a href="/detail.html">
                    <p class="brand">FEAR OF GOD</p>
                    <p class="cloth">${product.name}</p>
                    <p class="category">${product.category}</p>
                    <p class="price">&#8361;${product.price}</p>
                </a>
            </div>
        `;

        itemContainer.appendChild(itemElement);
    });
};

// 페이지네이션 함수
const generatePagination = (products, category) => {
    const paginationContainer = document.getElementById('pagination');
    if (category === 'SHOP_ALL') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => !category || product.category === category);
    }
    const totalPages = Math.ceil(filteredProducts.length / pageItems);

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('p');
        pageButton.textContent = i;
        pageButton.addEventListener('click', () => {
            // 페이지 버튼 클릭 시 해당 페이지의 상품을 표시
            clearItems();
            generateProducts(products, category, i);
        });

        paginationContainer.appendChild(pageButton);
    }
    console.log(totalPages)
};

const urlParams = new URLSearchParams(window.location.search);
const urlCategory = urlParams.get('category') || ''; // 기본값 설정

const products = [];

// for (let i = 1; i <= 30; i++) {
//     const price = Math.floor(Math.random() * 10) * 10000 + 100000;
//     const formattedPrice = price.toLocaleString();
//     const category = getCategoryById(i); // 수정된 부분

//     const product = {   
//         name: `demo${i}`,
//         id: i,
//         price: formattedPrice,
//         category: category,
//         imgUrl: `images/productsImg/products${i}.png`
//     };

//     products.push(product);
// }

// function getCategoryById(id) {
//     const categories = [
//         'SHOP_ALL', 'NEW_RELEASES', 'SUITING', 'OUTERWEAR', 'KNITWEAR',
//         'TOPS', 'BOTTOMS', 'LOUNGEWEAR', 'FOOTWEAR', 'ACCESSORIES'
//     ];

//     // id 값을 categories 배열의 인덱스로 사용하여 해당하는 카테고리를 반환
//     // 데모 상품 작성을 위한 랜덤 카테고리 할당으로, 실제 상품 반영시에는 71열, getCategoryById에서 개별 카테고리 및 상품정보를 입력해야됨.
//     const index = (id - 1) % (categories.length - 1); // SHOP ALL 제외
//     return categories.filter(category => category !== 'SHOP_ALL')[index];
// }

// const productInfo = [
//     { name: 'dsa', price: 150000, category: 'SUITING' },
//     { name: 'dsada', price: 12000, category: 'SUITING' },
//     { name: 'grewge', price: 100000, category: 'SUITING' },
//     { name: 'dsa d', price: 45968, category: 'SUITING' },
//     { name: 'grwe', price: 21575, category: 'SUITING' }
// ];

for (let i = 0; i <= productInfo.length - 1; i++) {
    const id = i + 1;
    const price = Math.floor(Math.random() * 10) * 10000 + 100000;
    const formattedPrice = price.toLocaleString();
    // const category = getCategoryById(i); // 수정된 부분

    const product = {   
        name: productInfo[i % productInfo.length].name,
        id: id,
        price: formattedPrice,
        category: productInfo[i % productInfo.length].category,
        imgUrl: `images/productsImg/products${id}.png`
    };

    products.push(product);
}
console.log(products)

// function getCategoryById(id) {
//     const categories = [
//         'SHOP_ALL', 'NEW_RELEASES', 'SUITING', 'OUTERWEAR', 'KNITWEAR',
//         'TOPS', 'BOTTOMS', 'LOUNGEWEAR', 'FOOTWEAR', 'ACCESSORIES'
//     ];

//     // id 값을 categories 배열의 인덱스로 사용하여 해당하는 카테고리를 반환
//     // 데모 상품 작성을 위한 랜덤 카테고리 할당으로, 실제 상품 반영시에는 71열, getCategoryById에서 개별 카테고리 및 상품정보를 입력해야됨.
//     const index = (id - 1) % (categories.length - 1); // SHOP ALL 제외
//     return categories.filter(category => category !== 'SHOP_ALL')[index];
// }

// 페이지 초기화 함수
const clearItems = () => {
    const itemContainer = document.getElementById('items');
    itemContainer.innerHTML = '';
};

// 초기 페이지 로딩 시 페이지네이션 및 상품 표시
generatePagination(products, urlCategory);
generateProducts(products, urlCategory, 1);


