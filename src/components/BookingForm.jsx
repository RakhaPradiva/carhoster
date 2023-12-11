import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Box, Grid, Typography, TextField, Checkbox, CircularProgress } from "@mui/material";
import { Button } from "@mui/joy";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../config/firebaseConfig";

const BookingForm = ({ car }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phoneNumber: "",
		startDate: "",
		endDate: "",
		address: "",
		terms: false,
	});
	const [loading, setLoading] = useState(false);
	const { name, email, phoneNumber, startDate, endDate, address, terms } = formData;

	const isAvailable = car.status === "Available";
	const today = new Date();
	const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;
	const startDateObj = new Date(startDate);
	startDateObj.setDate(startDateObj.getDate() + 1);
	const nextDay = `${startDateObj.getFullYear()}-${String(startDateObj.getMonth() + 1).padStart(2, "0")}-${String(startDateObj.getDate()).padStart(2, "0")}`;
	const clientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
	const serverKey = import.meta.env.VITE_MIDTRANS_SERVER_KEY;
	const paymentLink = import.meta.env.VITE_MIDTRANS_PAYMENT_LINK;

	useEffect(() => {
		onAuthStateChanged(auth, (user) => {
			if (user) {
				setFormData((prevState) => ({ ...prevState, name: user.displayName, email: user.email }));
			}
		});
	}, []);

	const handleChange = (event) => {
		setFormData((prevState) => ({ ...prevState, [event.target.name]: event.target.value }));
	};

	const handleCheckboxChange = (event) => {
		setFormData((prevState) => ({ ...prevState, terms: event.target.checked }));
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		const authHeader = `Basic ${btoa(serverKey + ":")}`;

		let data = {
			item_details: [
				{
					id: car.id,
					name: car.year + " " + car.model + " " + car.make,
					price: car.price,
					quantity: Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)),
					brand: car.model,
					category: car.type,
					merchant_name: "CarHoster",
				},
			],
			customer_details: {
				first_name: name,
				email: email,
				phone: phoneNumber,
				shipping_address: {
					first_name: name,
					email: email,
					phone: phoneNumber,
					address: address,
				},
			},
			transaction_details: {
				order_id: "CHOD" + Date.now(),
				gross_amount: car.price * Math.ceil((new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24)),
			},
		};

		const url = await fetch(`${paymentLink}/v1//payment-links`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: authHeader,
				Accept: "application/json",
			},
			body: JSON.stringify(data),
		});

		const response = await url.json();

		window.open(response.payment_url, "_blank", "noopener,noreferrer");
		window.location.href = "/car";
		
		setFormData({
			name: "",
			email: "",
			phoneNumber: "",
			startDate: "",
			endDate: "",
			address: "",
			terms: false,
		});

		// close current tab
		setLoading(false);
	};

	return (
		<Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
			<Typography variant="h4" fontWeight={700} textAlign={"center"} gutterBottom>
				Form Penyewaan
			</Typography>
			<Grid container spacing={2}>
				<Grid item xs={12} sm={6}>
					<TextField required fullWidth type="text" label="Nama" name="name" value={name} onChange={handleChange} disabled={!isAvailable} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField required fullWidth type="email" label="Email" name="email" value={email} onChange={handleChange} disabled={!isAvailable} />
				</Grid>
				<Grid item xs={12}>
					<TextField required type="tel" fullWidth label="Nomor Telepon" name="phoneNumber" value={phoneNumber} onChange={handleChange} disabled={!isAvailable} />
				</Grid>
				<Grid item xs={12} sm={6}>
					<TextField
						required
						fullWidth
						type="date"
						label="Tanggal Mulai"
						InputLabelProps={{ shrink: true }}
						inputProps={{ min: dateString }}
						name="startDate"
						value={startDate}
						onChange={handleChange}
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
						name="endDate"
						onChange={handleChange}
						inputProps={{ min: nextDay }}
						disabled={!isAvailable}
					/>
				</Grid>
				<Grid item xs={12}>
					<TextField required fullWidth multiline rows={4} label="Alamat" name="address" value={address} onChange={handleChange} disabled={!isAvailable} />
				</Grid>
				<Grid item xs={12}>
					<Checkbox required checked={terms} onChange={handleCheckboxChange} disabled={!isAvailable} />
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
