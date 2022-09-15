import React from "react";

const user ={
    name: "brenda"
};


const product= [
    {title: 'chocolate', isItem: false, id: 1},
    {title: 'icetea', isItem: false, id:2},
    {title: 'phone', isItem: true, id:3},
    {title: 'keychain', isItem: true, id:4},
]


function Shoppinglist(){
    const listItems = product.map(product =>
        <li
        key={product.id}
            style={{color: product.isItem ? 'magenta' : "darkgreen"}}>
            
        
        {product.title}
        </li>
    );

    return <ul>{listItems}</ul>

}


export default Shoppinglist




// function Lijst(){+
//     return <div>
//                 <h1>{user.name}</h1>
//             </div>
// };




// export default Lijst