import { useIsFocused } from "@react-navigation/native";
import { Text } from "@rneui/base";
import { useEffect, useState } from "react";
import { FlatList, Keyboard, View } from "react-native";
import PlaceItem from "../components/Places/PlaceItem";
import PlaceList from "../components/Places/PlaceList";
import Place from "../models/place";
import { fetchPlace } from "../utils/database";

function AllPlaces({ router }) {
    const [loadedPlaces, setLoadedPlaces] = useState([Place])
    const isFocused = useIsFocused()
    useEffect(() => {
        async function loadPlaces() {
            const places = await fetchPlaces()
            setLoadedPlaces(places)
        }
        if (isFocused && router) {
            loadPlaces()
        }
    }, [isFocused, router])

    return (
        <PlaceList places={loadedPlaces}>
        </PlaceList>
    )
}

export default AllPlaces