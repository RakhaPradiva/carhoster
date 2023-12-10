import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";
import { CircularProgress, Container, Grid, Typography, useMediaQuery, useTheme } from "@mui/material";
import { BookingForm, CarDetailCard } from "../components";

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

const CarDetails = () => {
	const { id } = useParams();
	const [car, setCar] = useState(null);
	const [loading, setLoading] = useState(true);

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	useEffect(() => {
		fetchCarDetails(id, setCar, setLoading);
	}, [id]);

	return (
		<Container
			sx={{
				mt: 3,
				mb: 3,
				display: "flex",
				flexDirection: "column",
				alignItems: isMobile ? "center" : "stretch",
				justifyContent: isMobile ? "center" : "flex-start",
			}}
		>
			{loading ? (
				<CircularProgress />
			) : car ? (
				<Grid container spacing={4} alignItems="center">
					<Grid item xs={12} sm={6}>
						<CarDetailCard car={car} />
					</Grid>
					<Grid item xs={12} sm={6}>
						<BookingForm car={car} />
					</Grid>
				</Grid>
			) : (
				<Typography variant="body1">Car not found</Typography>
			)}
		</Container>
	);
};

export default CarDetails;
