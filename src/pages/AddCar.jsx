import { useState } from "react";
import { Box, Container, FormControlLabel, Grid, Radio, RadioGroup, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { Button } from "@mui/joy";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import { collection, addDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, imgStorage } from "../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

const AddCar = () => {
	const [carImage, setCarImage] = useState(null);
	const [type, setType] = useState("");
	const [make, setMake] = useState("");
	const [model, setModel] = useState("");
	const [year, setYear] = useState("");
	const [fuel, setFuel] = useState("");
	const [price, setPrice] = useState("");
	const [transmission, setTransmission] = useState("");
	const [seats, setSeats] = useState("");
	const [status, setStatus] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		const storageRef = ref(imgStorage, `cars/${carImage.name}`);
		const uploadTask = uploadBytesResumable(storageRef, carImage);

		uploadTask.on(
			"state_changed",
			(snapshot) => {
				const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log("Upload is " + progress + "% done");
			},
			(error) => {
				console.error(error);
			},
			async () => {
				try {
					const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
					console.log("File available at", downloadURL);

					const car = {
						carImage: downloadURL,
						type,
						make,
						model,
						year,
						fuel,
						price: parseInt(price),
						transmission,
						seats,
						status,
					};

					await addDoc(collection(db, "cars"), car);
					console.log("Car added successfully");
					navigate("/car");
				} catch (error) {
					console.error("Error adding car: ", error);
				}
			}
		);
	};

	const handleFileChange = (e) => {
		setCarImage(e.target.files[0]);
	};

	return (
		<Container maxWidth="md">
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					justifyContent: "center",
					alignItems: "center",
					height: "100vh",
				}}
			>
				<Typography variant="h4" align="center" gutterBottom>
					Tambah Mobil
				</Typography>
				<form onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						<Grid item xs={6}>
							<TextField fullWidth label="Make" value={make} onChange={(e) => setMake(e.target.value)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth label="Model" value={model} onChange={(e) => setModel(e.target.value)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth label="Type" value={type} onChange={(e) => setType(e.target.value)} />
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth label="Harga" value={price} onChange={(e) => setPrice(e.target.value)} type="number" />
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<InputLabel>Tipe Bahan Bakar</InputLabel>
								<Select value={fuel} onChange={(e) => setFuel(e.target.value)}>
									<MenuItem value={"Bensin"}>Bensin</MenuItem>
									<MenuItem value={"Diesel"}>Diesel</MenuItem>
									<MenuItem value={"Hybrid"}>Hybrid</MenuItem>
									<MenuItem value={"Listrik"}>Listrik</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth label="Tahun" value={year} onChange={(e) => setYear(e.target.value)} type="number" />
						</Grid>
						<Grid item xs={6}>
							<FormControl fullWidth>
								<InputLabel>Transmisi</InputLabel>
								<Select value={transmission} onChange={(e) => setTransmission(e.target.value)}>
									<MenuItem value={"Manual"}>Manual</MenuItem>
									<MenuItem value={"Automatic"}>Automatic</MenuItem>
								</Select>
							</FormControl>
						</Grid>
						<Grid item xs={6}>
							<TextField fullWidth label="Jumlah Kursi" value={seats} onChange={(e) => setSeats(e.target.value)} type="number" />
						</Grid>
						<Grid item xs={12}>
							<Box sx={{ my: 1, display: "flex", alignItems: "center", gap: 3 }}>
								<input accept="image/*" style={{ display: "none" }} id="contained-button-file" type="file" onChange={handleFileChange} />
								<label htmlFor="contained-button-file">
									<Button variant="solid" component="span">
										<FileUploadIcon />
										Upload Image
									</Button>
								</label>
								{carImage && <Typography variant="h6">{carImage.name}</Typography>}
							</Box>
						</Grid>
						<Grid item xs={12}>
							<Typography variant="body1" gutterBottom>
								Status Ketersediaan
							</Typography>
							<RadioGroup value={status} onChange={(e) => setStatus(e.target.value)}>
								<FormControlLabel value="Available" control={<Radio />} label="Available" />
								<FormControlLabel value="Not Available" control={<Radio />} label="Not Available" />
							</RadioGroup>
						</Grid>
						<Grid item xs={12}>
							<Button fullWidth variant="solid" type="submit">
								Tambah Mobil
							</Button>
						</Grid>
					</Grid>
				</form>
			</Box>
		</Container>
	);
};

export default AddCar;
