import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home, Car, CarDetails, Contact, AddCar, NotFound } from "./pages";
import { Navbar, BottomMenu, Footer } from "./components";
import { onAuthStateChanged } from "firebase/auth";
import { auth, analytics } from "./config/firebaseConfig";
import { logEvent } from "firebase/analytics";

const App = () => {
	const [user, setUser] = useState(null);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user.email);
			} else {
				setUser(null);
			}
		});

		logEvent(analytics, "page_view", {
			page_title: document.title,
			page_location: window.location.href,
			page_path: window.location.pathname,
		});

		return () => unsubscribe();
	}, []);

	return (
		<Router>
			<Navbar />
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/car" element={<Car />} />
				<Route path="/car/:id" element={<CarDetails />} />
				<Route path="/contact" element={<Contact />} />
				<Route path="/addcar" element={user === "rakhapradiva.dev@gmail.com" ? <AddCar /> : <NotFound />} />
				<Route path="*" element={<NotFound />} />
			</Routes>
			<Footer />
			<BottomMenu />
		</Router>
	);
};

export default App;
