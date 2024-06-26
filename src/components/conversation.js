import React, { Fragment } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
// import { TypeAnimation } from "react-type-animation";

dayjs.extend(utc);
dayjs.extend(timezone);

dayjs.tz.setDefault("Asia/Bahrain");

export const initChatList = [
	{
		loading: false,
		from: "system",
		msg: (
			<Fragment>
				<p>السلام عليكم ورحمة الله وبركاته،</p>
				<br />
				<p>اسمي عبدالله من البحرين، مبرمج لتطبيقات الويب، الموبايل و جميع انواع الانظمة</p>
				<br />
				<p>
					Follow me on (X){" "}
					<a href="https://x.com/abdullascript" target="_blank" rel="noreferrer">
						@AbdullaScript
					</a>
				</p>
			</Fragment>
		),
		// date: dayjs().locale("ar-sa").tz().format("HH:mm A"),
		date: dayjs().tz().format("HH:mm A"),
	},
	// {
	// 	loading: true,
	// 	from: "system",
	// 	msg: (
	// 		<Fragment>
	// 			<TypeAnimation
	// 				sequence={[".", 200, "..", 200, "...", 200, "....", 1000]}
	// 				wrapper="span"
	// 				speed={10}
	// 				deletionSpeed={5}
	// 				style={{ fontSize: "1rem", display: "inline-block" }}
	// 				repeat={Infinity}
	// 				cursor={false}
	// 			/>
	// 		</Fragment>
	// 	),
	// 	date: "10:15 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "me",
	// 	msg: "مرحبًا",
	// 	date: "10:15 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "system",
	// 	msg: "مرحبًا! كيف يمكنني مساعدتك اليوم؟",
	// 	date: "10:15 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "me",
	// 	msg: "أنا في حيرة بين استخدام Node.js و PHP في تطوير موقع الويب الجديد.",
	// 	date: "10:16 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "system",
	// 	msg: "لديك أي معلومات إضافية حول متطلبات المشروع؟",
	// 	date: "10:16 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "me",
	// 	msg: "المشروع يتطلب أداء عالي وتفاعل فعّال مع العملاء.",
	// 	date: "10:17 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "system",
	// 	msg: "في هذه الحالة، يمكن أن يكون Node.js خيارًا جيدًا بسبب أدائه العالي وطريقة تعامله الفعّالة مع الطلبات.",
	// 	date: "10:17 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "me",
	// 	msg: "لكن PHP يعتبر لغة برمجة شائعة ولها مجتمع كبير.",
	// 	date: "10:18 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "system",
	// 	msg: "صحيح، لكن يجب أن ننظر إلى الاحتياجات الخاصة بالمشروع. Node.js يوفر أداءًا ممتازًا ويسمح بتطوير تطبيقات ذات استجابة سريعة.",
	// 	date: "10:18 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "me",
	// 	msg: "لكن معظم المطورين يعرفون PHP، هل لا يجعل ذلك الأمور أسهل؟",
	// 	date: "10:19 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "system",
	// 	msg: "فهم ذلك، ولكن Node.js يتيح للمطورين استخدام JavaScript على الجانبين الخادم والعميل، مما يسهل عليهم تطوير تطبيقات متكاملة.",
	// 	date: "10:19 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "me",
	// 	msg: "لكن هل Node.js يمكنه التكامل مع قواعد البيانات بشكل جيد؟",
	// 	date: "10:20 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "system",
	// 	msg: "نعم، يدعم Node.js العديد من قواعد البيانات ويوفر مكتبات قوية لتفاعل معها.",
	// 	date: "10:20 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "me",
	// 	msg: "أعتقد أنني سأختار Node.js لمشروعي. شكرًا للمساعدة!",
	// 	date: "10:21 AM",
	// },
	// {
	// 	loading: false,
	// 	from: "system",
	// 	msg: "لا داعي للشكر! إذا كان لديك أسئلة أخرى، فلا تتردد في طرحها.",
	// 	date: "10:21 AM",
	// },
];
