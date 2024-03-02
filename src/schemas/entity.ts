import Item from "@/schemas/Item";

type Entity<RelationshipType = { [key: string]: Item<Entity> }> = {
    id: string,
    type: string,
    attributes: {
        _id: string,
    },
    relationships?: RelationshipType

}


export default Entity;