import { Grid, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { rupiah } from "../utils";

const CarDetailCard = ({ car }) => {
	const theme = useTheme();
	const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

	return (
		<Paper elevation={3} sx={{ maxWidth: "100%", padding: 3 }}>
			<Grid container spacing={4} direction="column" alignItems="center" justifyContent={isSmallScreen ? "center" : "flex-start"}>
				<Grid item xs={12}>
					<Typography variant="h5">
						{car.year} {car.make} {car.model}
					</Typography>
					<Grid item xs={12}>
						<img
							src={car.carImage}
							alt={`${car.year} ${car.make} ${car.model}`}
							style={{
								width: "100%",
								height: "100%",
								display: "block",
								margin: "auto",
								objectFit: "cover",
								objectPosition: "center",
								minHeight: "300px",
							}}
						/>
					</Grid>
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
						Harga Sewa: {rupiah(car.price)} / hari
					</Typography>
				</Grid>
			</Grid>
		</Paper>
	);
};

export default CarDetailCard;
