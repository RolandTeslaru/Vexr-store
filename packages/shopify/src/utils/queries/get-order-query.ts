export const getOrderQuery = `
    query getOrderById($id: Int!) {
        orderByHandle(handle: $id) {
            id
            email
            displayFulfillmentStatus
            paymentGatewayNames
            confirmed
            phone
            shippingAddress{
                firstName
                lastName
                phone
                formatted
            }
            billingAddress{
                firstName
                lastName
                phone
                formatted
            }
            fulfillments{
                status
                updatedAt
                createdAt
                totalQuantity
                trackingInfo {
                    company
                    number
                    url
                }
            }
    }

`
export default getOrderQuery