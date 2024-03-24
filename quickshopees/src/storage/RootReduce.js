const initialState={
    products:{},
    user:{}
     
}

export default function RootReduce(state=initialState,action)
{
    switch(action.type)
    {
        case "Add_Product":
            state.products[action.payload[0]]=action.payload[1]
            console.log(state.products)
            return {products:state.products,user:state.user}

        case "Edit_Product":
            state.products[action.payload[0]]=action.payload[1]
                    return {products:state.products,user:state.user}

        case "Delete_Product":
            delete state.products[action.payload[0]]
            console.log(state.products)
            return {products:state.products}

            case "Add_USER":
                state.user=action.payload[0]
                console.log(state.products)
                return {products:state.products,user:state.user}       
                    default:
                return {products:state.products,user:state.user}

                    

    }
}