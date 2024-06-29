import { CollectionConfig } from "payload/types";

const Reviews: CollectionConfig = {
    slug: "reviews",
    fields: [
        {
            type: "text",
            name: "text",
            label: "Review",
        },
        {
            type: "text",
            name: "name",
            label: "Person Name",
        },
    ]
}
export default Reviews;