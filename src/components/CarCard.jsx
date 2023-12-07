import { Box, Card, CardContent, Typography, Paper, IconButton, Tooltip } from "@mui/material";
import { Button } from "@mui/joy";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";
import LocalGasStationIcon from "@mui/icons-material/LocalGasStation";
import DriveEtaIcon from "@mui/icons-material/DriveEta";
import EventSeatIcon from "@mui/icons-material/EventSeat";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import { rupiah } from "../utils";

const CarCard = ({ id, carImage, type, make, model, year, fuel, price, transmission, seats, status }) => {
	const carDetailsLink = `/car/${id}`;

	return (
		<Paper elevation={3}>
			<Card>
				<CardMedia component="img" sx={{ objectFit: "contain" }} height="250" image={carImage} alt={year + make + model} />
				<CardContent>
					<Box display="flex" justifyContent="space-between" alignItems="center">
						<Box>
							<Typography variant="h6" component="div" gutterBottom>
								{year} {make} {model}
							</Typography>
							<Typography variant="subtitle2" color="text.secondary" gutterBottom>
								{type}
							</Typography>
						</Box>
						<Box display="flex" alignItems="center">
							<Tooltip title={status}>{status === "Available" ? <CheckCircleIcon color="success" /> : <CancelIcon color="error" />}</Tooltip>
						</Box>
					</Box>
					<Box display="flex" justifyContent="space-between" marginBottom={2}>
						<Box display="flex" alignItems="center">
							<IconButton>
								<LocalGasStationIcon />
							</IconButton>
							<Typography variant="body2" color="text.secondary">
								{fuel}
							</Typography>
						</Box>
						<Box display="flex" alignItems="center">
							<IconButton>
								<DriveEtaIcon />
							</IconButton>
							<Typography variant="body2" color="text.secondary">
								{transmission}
							</Typography>
						</Box>
						<Box display="flex" alignItems="center">
							<IconButton>
								<EventSeatIcon />
							</IconButton>
							<Typography variant="body2" color="text.secondary">
								{seats} kursi
							</Typography>
						</Box>
					</Box>
					<Typography variant="h6">{rupiah(price)} / hari</Typography>
					<Button variant="solid" fullWidth component={Link} to={carDetailsLink}>
						Book
					</Button>
				</CardContent>
			</Card>
		</Paper>
	);
};

export default CarCard;
