import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { rupiah } from "../utils";
import { auth } from "../config/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";
import { Box, Grid, Typography, TextField, Checkbox, CircularProgress } from "@mui/material";
import { Button } from "@mui/joy";

const BookingForm = ({ car }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [startDate, setStartDate] = useState("");
	const [endDate, setEndDate] = useState("");
	const [address, setAddress] = useState("");
	const [terms, setTerms] = useState(false);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setName(user.displayName);
				setEmail(user.email);
			}
		});
	}, []);

	const today = new Date();
	const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
	const isAvailable = car.status === "Available";

	const startDateObj = new Date(startDate);
	startDateObj.setDate(startDateObj.getDate() + 1);
	const nextDay = `${startDateObj.getFullYear()}-${String(startDateObj.getMonth() + 1).padStart(2, "0")}-${String(startDateObj.getDate()).padStart(2, "0")}`;

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);

		const startDateObj = new Date(startDate);
		const endDateObj = new Date(endDate);
		const numberOfDays = Math.ceil((endDateObj.getTime() - startDateObj.getTime()) / (1000 * 60 * 60 * 24));

		const rentPrice = numberOfDays * car.price;

		alert(`The rent price is ${rupiah(rentPrice)}`);

		setLoading(false);
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
			<Typography variant="h4" fontWeight={700} textAlign={"center"} gutterBottom>
				Form Penyewaan
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField required fullWidth type="text" label="Nama" value={name} onChange={(e) => setName(e.target.value)} disabled={!isAvailable} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField required fullWidth type="email" label="Email" value={email} onChange={(e) => setEmail(e.target.value)} disabled={!isAvailable} />
				</Grid>
				<Grid item xs={12}>
					<TextField required type="tel" fullWidth label="Nomor Telepon" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} disabled={!isAvailable} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						type="date"
						label="Tanggal Mulai"
						InputLabelProps={{ shrink: true }}
						inputProps={{ min: dateString }}
						value={startDate}
						onChange={(e) => setStartDate(e.target.value)}
						disabled={!isAvailable}
					/>
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						type="date"
						label="Tanggal Selesai"
						InputLabelProps={{ shrink: true }}
						value={endDate}
						onChange={(e) => setEndDate(e.target.value)}
						inputProps={{ min: nextDay }}
						disabled={!isAvailable}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField required fullWidth multiline rows={4} label="Alamat" value={address} onChange={(e) => setAddress(e.target.value)} disabled={!isAvailable} />
				</Grid>
				<Grid item xs={12}>
					<Checkbox required checked={terms} onChange={(e) => setTerms(e.target.checked)} disabled={!isAvailable} />
					<Typography variant="body1" component="span">
						Saya menyetujui <Link to="/">syarat dan ketentuan</Link> yang berlaku
					</Typography>
				</Grid>

				<Grid item xs={12}>
					<Button variant="solid" type="submit" disabled={loading || !name || !email || !phoneNumber || !startDate || !endDate || !address || !terms || !isAvailable} fullWidth>
						Book
						{loading && <CircularProgress size={24} sx={{ position: "absolute" }} />}
					</Button>
				</Grid>
			</Grid>
		</Box>
	);
};

export default BookingForm;
