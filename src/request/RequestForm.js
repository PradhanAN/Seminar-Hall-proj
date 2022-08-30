import React, { useState, useEffect } from "react";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import TextField from "@mui/material/TextField";
import {
	DateTimePicker,
	LocalizationProvider,
	TimePicker,
} from "@mui/x-date-pickers";
import { useForm } from "react-hook-form";
import "./RequestForm.css";

const renderDateTimes = (data) => {
	// console.log(data);
	return data.map((entry) => {
		// console.log(entry);
		return (
			<div key={entry.date}>
				<p>{entry.date.toDateString()}</p>
				<p>{entry.fromTime.toString()}</p>
				<p>{entry.toTime.toString()}</p>
			</div>
		);
	});
};

const RequestForm = () => {
	const currDate = new Date();
	const [fromTime, setFromTime] = useState(currDate);
	const [toTime, setToTime] = useState(currDate);
	const [rawData, setRawData] = useState([]);
	const [renderedDates, setRenderedDates] = useState([]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const dates = async (e) => {
		e.preventDefault();

		toTime.setFullYear(
			fromTime.getFullYear(),
			fromTime.getMonth(),
			fromTime.getDate()
		);

		const currData = {
			date: fromTime,
			fromTime: fromTime,
			toTime: toTime,
		};
		await setRawData([...rawData, currData]);
		// setRenderedDates(renderDateTimes(rawData));
	};

	useEffect(() => {
		// console.log(rawData);
		setRenderedDates(renderDateTimes(rawData));
	}, [rawData]);

	const onSubmit = (data) => {
		const curatedData = {
			...data,
			date: currDate,
			dates: rawData,
		};
		console.log(curatedData);
	};
	return (
		<div>
			<div>
				<h1>Request Form</h1>
				<div className="form-group">
					{/* <form onSubmit={handleFormSubmit}> */}
					<form onSubmit={handleSubmit(onSubmit)}>
						<div>
							<label form="">Capacity: </label>
							<input
								type="number"
								{...register("capacity", {
									required: true,
									min: 0,
								})}
							/>
						</div>
						<div>
							<label form="">Description: </label>
							<textarea
								type="text"
								{...register("description", { required: true })}
							/>
						</div>
						{renderedDates}
						<LocalizationProvider dateAdapter={AdapterDayjs}>
							<div>
								<DateTimePicker
									label="Start Date"
									// {...register("startDateAndTime", {
									// 	required: true,
									// })}
									value={fromTime}
									onChange={(value) => setFromTime(value.$d)}
									renderInput={(props) => (
										<TextField {...props} />
									)}
								/>
							</div>
							<div>
								<TimePicker
									label="End Time"
									// {...register("endDateAndTime", {
									// 	required: true,
									// })}
									value={toTime}
									onChange={(value) => setToTime(value.$d)}
									renderInput={(props) => (
										<TextField {...props} />
									)}
								/>
							</div>
						</LocalizationProvider>
						<button onClick={dates}>+</button>
						<div>
							<label form="">Preference 1: </label>
							<input
								type="text"
								{...register("preference1", { required: true })}
							/>
						</div>
						<div>
							<label form="">Preference 2: </label>
							<input type="text" {...register("preference2")} />
						</div>
						<div>
							<label form="">Preference 3: </label>
							<input type="text" {...register("preference3")} />
						</div>
						<button type="submit">SUBMIT</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default RequestForm;
