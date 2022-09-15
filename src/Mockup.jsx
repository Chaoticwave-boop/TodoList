import React, { useState } from "react";
import './App.scss';



function FilterableProductTable({ products }) {
    const [filterText, setFilterText] = useState('');
    const [inStockOnly, setInStockOnly] = useState(false);
  
    return (
      <div>
        <SearchBar 
          filterText={filterText} 
          inStockOnly={inStockOnly} 
          onFilterTextChange={setFilterText} 
          onInStockOnlyChange={setInStockOnly} />
        <ProductTable 
          products={products} 
          filterText={filterText}
          inStockOnly={inStockOnly} />
      </div>
    );
  }
  
  function ProductCategoryRow({ category }) {
    return (
      <tr>
        <th colSpan="2">
          {category}
        </th>
      </tr>
    );
  }
  
  function ProductRow({ product }) {
    const name = product.stocked ? product.name :
      <span style={{ color: 'red' }}>
        {product.name}
      </span>;
  
    return (
      <tr>
        <td>{name}</td>
        <td>{product.price}</td>
      </tr>
    );
  }
  
  function ProductTable({ products, filterText, inStockOnly }) {
    const rows = [];
    let lastCategory = null;
  
    products.forEach((product) => {
      if (
        product.name.toLowerCase().indexOf(
          filterText.toLowerCase()
        ) === -1
      ) {
        return;
      }
      if (inStockOnly && !product.stocked) {
        return;
      }
      if (product.category !== lastCategory) {
        rows.push(
          <ProductCategoryRow
            category={product.category}
            key={product.category} />
        );
      }
      rows.push(
        <ProductRow
          product={product}
          key={product.name} />
      );
      lastCategory = product.category;
    });
  
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
  
  function SearchBar({
    filterText,
    inStockOnly,
    onFilterTextChange,
    onInStockOnlyChange
  }) {
    return (
      <form>
        <input 
          id="searchbar"
          type="text" 
          value={filterText} placeholder="Search..." 
          onChange={(e) => onFilterTextChange(e.target.value)} />
        <label id="box">
          <input 
            
            type="checkbox" 
            checked={inStockOnly} 
            onChange={(e) => onInStockOnlyChange(e.target.checked)} />
          {' '}
          Only show products in stock
        </label>
      </form>
    );
  }



const PRODUCTS = [
    {category: "Horror", price: "$20", stocked: true, name: "Resident-evil-village"},
    {category: "Horror", price: "$10", stocked: true, name: "Poppy-playtime"},
    {category: "Horror", price:"$15", stocked: false, name: "Outlast"},
    {category: "Dungeon-crawler", price: "$15", stocked: false, name: "Binding-of-Isaac"},
    {category: "Dungeon-crawler", price: "$60", stocked: true, name: "Borderlands-3"},
    {category: "Dungeon-crawler", price: "$30", stocked: true, name: "Cult-of-the-lamb"},
    {category: "Fantasy", price: "$60", stocked: true, name: "Elden-Ring"},
    {category: "Fantasy", price: "$35", stocked: true, name: "The-Witcher"},
    {category: "Fantasy", price: "$40", stocked: false, name: "Skyrim"}
]



export default function ListGame(){
    return <FilterableProductTable products={PRODUCTS} />;
}