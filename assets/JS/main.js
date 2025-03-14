
const getCategory = async () =>{
    const {data} = await axios.get('https://fakestoreapi.com/products/categories');
    return data;
}
const displayCategory = async () =>{
    try{
    const category = await getCategory();
    const result = category.map((category)=>{
        return  `
        <div class="categoryItem">
            <a class="categoryName" href="./productCategory.html?category=${category}">${category}</a>
        </div>
        `
    }).join('');
    document.querySelector('.category .row').innerHTML = result;
}catch(error){
    document.querySelector('.productDetails .row').innerHTML = "<p>Please try agin please</p>"
}finally{
    document.querySelector('.loading').classList.add('d-none');
}
}
displayCategory();