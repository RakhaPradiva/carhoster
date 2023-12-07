import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { Box, CircularProgress, Container, Grid, Paper, Typography } from "@mui/material";
import { Button } from "@mui/joy";
import { Link } from "react-router-dom";
import { rupiah } from "../utils";

const fetchCarDetails = async (id, setCar, setLoading) => {
	try {
		const carDoc = await getDoc(doc(db, "cars", id));

		if (carDoc.exists()) {
			setCar({ id, ...carDoc.data() });
		} else {
			console.log("Car not found");
		}
	} catch (error) {
		console.error("Error fetching car details:", error);
	} finally {
		setLoading(false);
	}
};

const CarDetailsDisplay = ({ car }) => (
	<Paper elevation={3} sx={{ maxWidth: "80%", padding: 3 }}>
		<Grid container spacing={2}>
			<Grid item xs={12} md={6}>
				<img src={car.carImage} alt={`${car.year} ${car.make} ${car.model}`} style={{ width: "100%", height: "auto" }} />
			</Grid>
			<Grid item xs={12} md={6}>
				<Typography variant="h5">
					{car.year} {car.make} {car.model}
				</Typography>
				<Typography variant="body1" gutterBottom>
					Tipe: {car.type}
				</Typography>
				<Typography variant="body1" gutterBottom>
					Bahan bakar: {car.fuel}
				</Typography>
				<Typography variant="body1" gutterBottom>
					Transmisi: {car.transmission}
				</Typography>
				<Typography variant="body1" gutterBottom>
					Jumlah kursi: {car.seats}
				</Typography>
				<Typography variant="body1" gutterBottom>
					Status: {car.status}
				</Typography>
				<Typography variant="body1" gutterBottom>
					Harga: {rupiah(car.price)} / hari
				</Typography>
				<Button variant="solid" color="success" disabled={car.status !== "Available"} fullWidth>
					Pesan
				</Button>
			</Grid>
		</Grid>
	</Paper>
);

const CarDetails = () => {
	const { id } = useParams();
	const [car, setCar] = useState(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		fetchCarDetails(id, setCar, setLoading);
	}, [id]);

	return (
		<Container maxWidth="xl" sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100vh" }}>
			{loading ? <CircularProgress /> : car ? <CarDetailsDisplay car={car} /> : <Typography variant="body1">Car not found</Typography>}
		</Container>
	);
};

export default CarDetails;
