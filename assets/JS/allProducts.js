// const getAllProducts = async (page) =>{
//     const skip = (page - 1) * 6;
//     const {data} = await axios.get(`https://fakestoreapi.com/products?limit=6&skip=${skip}`);
//     return data;
// }

// const displayAllProducts = async (page=1) =>{
//     const data = await getAllProducts(page);
//     const numberOfPages = 4;
//     const result = data.map((productItem) =>{
//         return`
//             <div class="productItems">
//                 <img src=${productItem.image} class="product-image"/>
//                 <h1 class="AllproductTitle">${productItem.title} <span class="price">${productItem.price}</span></h1>
//                 <h2 class="categoryName">Category : ${productItem.category}</h2>
//             </div>
//         `
//     }).join('');
//     document.querySelector('.allProducts .row').innerHTML = result;
//     cusomModal();
//     let paginationLink = ``;  
//     if(page >1){
//         paginationLink =`<li><button onclick=displayAllProducts(${page-1})>&lt;</button></li>`;
//     } else {
//         paginationLink =`<li><button disabled>&lt;</button></li>`;
//     }   
//     for(let i = 1; i<=numberOfPages;i++){
//         paginationLink += `<li><button onclick=displayAllProducts(${i})>${i}</button></li>`
//     }
//     if(page < numberOfPages){
//         paginationLink +=`<li><button onclick=displayAllProducts(${page+1})>&gt;</button></li>`;
//     }else{
//         paginationLink +=`<li><button disabled>&gt;</button></li>`;
//     }
//     // console.log(paginationLink);
//     document.querySelector('.pagination').innerHTML = paginationLink;
// }
// displayAllProducts();


// function cusomModal() {
//     const Modal = document.querySelector('.my-modal');
//     const closeBtn = document.querySelector('.closeBtn');
//     const rightBtn = document.querySelector('.rightBtn');
//     const leftBtn = document.querySelector('.leftBtn');
//     const ProductImage = Array.from(document.querySelectorAll('.product-image'));
//     let currentIndex = 0;
//     ProductImage.forEach(function(image){
//         // image.onclick = (e) =>{
//         //     console.log(e.target)
//         // }
//         image.addEventListener('click',(e) =>{
//             Modal.classList.remove('d-none');
//             Modal.querySelector('img').setAttribute("src",e.target.src);
//             const currentImage = e.target;
//             currentIndex = ProductImage.indexOf(currentImage);
//             // console.log(currentIndex)
//         })
//     });

//     closeBtn.addEventListener('click',(e) =>{
//         Modal.classList.add('d-none');

//     })
//     rightBtn.addEventListener('click',(e)=>{
//         currentIndex++;
//         if(currentIndex >= ProductImage.length){
//             currentIndex = 0;
//         }
//         const src = ProductImage[currentIndex].getAttribute("src");
//         Modal.querySelector('img').setAttribute('src',src);
//     });
//     leftBtn.addEventListener('click',(e) =>{
//         currentIndex--;
//         if (currentIndex <0){
//             currentIndex = ProductImage.length - 1;   
//         }
//         const src = ProductImage[currentIndex].getAttribute("src");
//         Modal.querySelector('img').setAttribute('src',src);
//         // console.log(src)
//     })
//     document.addEventListener('keydown' ,(e) =>{
//         // console.log(e); 
//         if(e.code == "ArrowRight"){
//             currentIndex++;
//             if(currentIndex >= ProductImage.length){
//                 currentIndex = 0;
//             }
//             const src = ProductImage[currentIndex].getAttribute("src");
//             Modal.querySelector('img').setAttribute('src',src);
//         }else if(e.code == "ArrowLeft"){
//             currentIndex--;
//             if (currentIndex <0){
//                 currentIndex = ProductImage.length - 1;   
//             }
//             const src = ProductImage[currentIndex].getAttribute("src");
//             Modal.querySelector('img').setAttribute('src',src);
//         }else if(e.code == "Escape"){
//             Modal.classList.add('d-none');
//         }
//     })

// }
// let allProducts = []; // Store all products

const getAllProducts = async (page) => {
    const { data } = await axios.get(`https://fakestoreapi.com/products`);
    allProducts = data; // Store all products globally
    displayAllProducts(1); // Display first page by default
};

const displayAllProducts = async (page = 1, limit = 6) => {
    const totalProducts = allProducts.length;
    const numberOfPages = Math.ceil(totalProducts / limit);
    
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const data = allProducts.slice(startIndex, endIndex); // Slice for pagination

    const result = data.map((productItem) => {
        return `
            <div class="productItems">
                <img src=${productItem.image} class="product-image"/>
                <h1 class="AllproductTitle">${productItem.title} <span class="price">${productItem.price}</span></h1>
                <h2 class="categoryName">Category : ${productItem.category}</h2>
            </div>
        `;
    }).join('');

    document.querySelector('.allProducts .row').innerHTML = result;
    cusomModal();

    let paginationLink = page > 1
        ? `<li><button onclick="displayAllProducts(${page - 1}, ${limit})">&lt;</button></li>`
        : `<li><button disabled>&lt;</button></li>`;

    for (let i = 1; i <= numberOfPages; i++) {
        paginationLink += `<li><button onclick="displayAllProducts(${i}, ${limit})">${i}</button></li>`;
    }

    paginationLink += page < numberOfPages
        ? `<li><button onclick="displayAllProducts(${page + 1}, ${limit})">&gt;</button></li>`
        : `<li><button disabled>&gt;</button></li>`;

    document.querySelector('.pagination').innerHTML = paginationLink;
};

// Fetch all products once
getAllProducts();
function cusomModal() {
    const Modal = document.querySelector('.my-modal');
    const closeBtn = document.querySelector('.closeBtn');
    const rightBtn = document.querySelector('.rightBtn');
    const leftBtn = document.querySelector('.leftBtn');
    const ProductImage = Array.from(document.querySelectorAll('.product-image'));
    let currentIndex = 0;
    ProductImage.forEach(function(image){
        // image.onclick = (e) =>{
        //     console.log(e.target)
        // }
        image.addEventListener('click',(e) =>{
            Modal.classList.remove('d-none');
            Modal.querySelector('img').setAttribute("src",e.target.src);
            const currentImage = e.target;
            currentIndex = ProductImage.indexOf(currentImage);
            // console.log(currentIndex)
        })
    });

    closeBtn.addEventListener('click',(e) =>{
        Modal.classList.add('d-none');

    })
    rightBtn.addEventListener('click',(e)=>{
        currentIndex++;
        if(currentIndex >= ProductImage.length){
            currentIndex = 0;
        }
        const src = ProductImage[currentIndex].getAttribute("src");
        Modal.querySelector('img').setAttribute('src',src);
    });
    leftBtn.addEventListener('click',(e) =>{
        currentIndex--;
        if (currentIndex <0){
            currentIndex = ProductImage.length - 1;   
        }
        const src = ProductImage[currentIndex].getAttribute("src");
        Modal.querySelector('img').setAttribute('src',src);
        // console.log(src)
    })
    document.addEventListener('keydown' ,(e) =>{
        // console.log(e); 
        if(e.code == "ArrowRight"){
            currentIndex++;
            if(currentIndex >= ProductImage.length){
                currentIndex = 0;
            }
            const src = ProductImage[currentIndex].getAttribute("src");
            Modal.querySelector('img').setAttribute('src',src);
        }else if(e.code == "ArrowLeft"){
            currentIndex--;
            if (currentIndex <0){
                currentIndex = ProductImage.length - 1;   
            }
            const src = ProductImage[currentIndex].getAttribute("src");
            Modal.querySelector('img').setAttribute('src',src);
        }else if(e.code == "Escape"){
            Modal.classList.add('d-none');
        }
    })

}
