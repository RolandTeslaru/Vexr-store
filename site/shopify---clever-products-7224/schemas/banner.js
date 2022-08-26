import shopifyProduct from "./objects/shopifyProduct";
import shopifyProductVariant from "./objects/shopifyProductVariant";

export default{
    name:"banner",
    title:'Banner',
    type:'document',
    fields:[
        {
            name:"product",
            title:"Product",
            type:"shopifyProductVariant"
        },
        {
            name:'image',
            title:'Image',
            type:'image',
            options:{
                hotspot:'true',
            },
        },
        {
            name:'buttonText',
            title:'Button Text',
            type:'string',
        },
        // {
        //     name:'product',
        //     title:'Product',
        //     type:'string',
        // },
        {
            name:'desc',
            title:'Description',
            type:'string',
        },
        {
            name:'smallText',
            title:'Small Text',
            type:'string',
        },
        {
            name:'midText',
            title:"Mid Text",
            type:'string',
        },
        {
            name:'largeText1',
            title:'Large Text1',
            type:'string',
        },
        {
            name: 'largeText2',
            title: 'LargeText2',
            type: 'string',
        },
        {
            name: 'discount',
            title: 'Discount',
            type: 'string',
        },
        {
            name: 'saleTime',
            title: 'SaleTime',
            type: 'string',
        },
    ],
};