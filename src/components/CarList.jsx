import { useEffect, useState } from "react";
import { Grid, Typography, CircularProgress, Box } from "@mui/material";
import CarCard from "./CarCard";
import { collection, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

const CarList = ({ searchQuery }) => {
	const [cars, setCars] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onSnapshot(collection(db, "cars"), (snapshot) => {
			setCars(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	const filteredCars = searchQuery
		? cars.filter(
				(car) =>
					car.make.toLowerCase().includes(searchQuery.toLowerCase()) ||
					car.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
					car.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
					car.year.toLowerCase().includes(searchQuery.toLowerCase())
		  )
		: cars;

	if (loading) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
				<CircularProgress />
			</Box>
		);
	}

	return (
		<Grid container spacing={3} padding={4}>
			{filteredCars.length === 0 ? (
				<Grid item xs={12}>
					<Typography variant="h6" align="center">
						Tidak ada mobil yang ditemukan
					</Typography>
				</Grid>
			) : (
				filteredCars.map((car) => (
					<Grid item xs={12} sm={6} md={3} key={car.id}>
						<CarCard {...car} />
					</Grid>
				))
			)}
		</Grid>
	);
};

export default CarList;
