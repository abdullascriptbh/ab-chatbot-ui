/* eslint-disable*/
import React, { useState, Fragment, useRef, useEffect, useReducer } from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone"; // dependent on utc plugin
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Bahrain");

import * as Spinner from "react-loader-spinner";
import { FaArrowUp, FaStop } from "react-icons/fa";
import { initChatList } from "./conversation";
import { Header } from "./Header";

function ChatBotUI() {
	const messagesEndRef = useRef(null);
	const inputRef = useRef(null);
	const [ChatlistInput, setChatlistInput] = useState(false);
	const [CharactersLeft, setCharactersLeft] = useState(100);

	// ChatInput
	const initChatInput = { UserMsg: "" };
	function ChatInput(state, action) {
		switch (action.type) {
			case "replace":
				return { UserMsg: action.payload.UserMsg };
			case "empty":
				return { UserMsg: "" };
			default:
				return state;
		}
	}
	const [chatInput, setChatInput] = useReducer(ChatInput, initChatInput);

	const [UserName, setUserName] = useState(`qabot-${Math.random()}`);
	const [chunks, setChunks] = useState("");
	const addChunkToState = (chunk) => {
		setChunks((prevChunks) => {
			const newChunks = prevChunks + chunk;
			// console.log("Chunks updated:", newChunks);
			return newChunks;
		});
		setChatList({
			type: "addChunk",
			payload: {
				loading: false,
				from: "system",
				msg: "",
				type: "",
			},
		});
	};
	function reducer(state, action) {
		switch (action.type) {
			case "addChunk":
				const lastItem = state[state.length - 1];

				var ResposeMsg = (
					<Fragment>
						<p style={{ whiteSpace: "pre-line", textAlign: "right" }} dir="rtl">
							{chunks}
						</p>
					</Fragment>
				);

				lastItem.msg = ResposeMsg;
				return [...state.slice(0, -1), lastItem];
			case "add":
				return [
					...state,
					{
						id: dayjs.tz().format("YYYYMMDDHHmmss"),
						loading: action.payload.loading,
						from: action.payload.from,
						msg: action.payload.msg,
						date: dayjs.tz().format("HH:mm A"),

						type: action.payload.type,
					},
				];

			case "removeLoading":
				return state.filter((item) => item.loading !== true);

			case "removeFeedback":
				state.map((item, index) => {
					item.type = "";
					item.loading !== true;
				});
				return state;

			default:
				return state;
		}
	}

	const [chatList, setChatList] = useReducer(reducer, initChatList);
	const scrollToBottom = () => {
		if (messagesEndRef.current) {
			messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
			setLastElementIndex(chatList?.length - 1);
		}
	};
	useEffect(() => {
		scrollToBottom();
		return () => {};
	}, [chatList]);

	function handleChatInput(e) {
		if (e.target.value.length >= 101) {
			alert("Max characters is 100");
			console.log("text length: ", e.target.value.length);
		} else {
			console.log("text length: ", e.target.value.length);
			setCharactersLeft(100 - e.target.value.length);
			setChatInput({
				type: "replace",
				payload: {
					UserMsg: e.target.value,
				},
			});
		}
	}

	const stopRequest = (e) => {
		e.preventDefault();
		console.log(e);
	};

	async function sendMsg(e, msg) {
		var msg = chatInput.UserMsg;
		e.preventDefault();

		if (msg) {
			setChatlistInput(true);
			setChatList({
				type: "add",
				payload: {
					loading: false,
					from: "me",
					msg: <Fragment>{msg}</Fragment>,
				},
			});
			setChatInput({
				type: "empty",
			});
			setChatList({
				type: "add",
				payload: {
					loading: true,
					from: "system",
					msg: (
						<Fragment>
							{/* <Spinner.Comment
								visible={true}
								height="60"
								width="80"
								ariaLabel="comment-loading"
								wrapperStyle={{}}
								wrapperClass="comment-wrapper"
								color="text-gray-300"
								backgroundColor="white"
							/> */}
							<div class="mx-auto w-full max-w-sm p-4">
								<div class="flex animate-pulse space-x-4">
									<div class="flex-1 space-y-6 py-1">
										{/* <div class="h-2 rounded bg-slate-700 dark:bg-slate-50"></div> */}
										<div class="space-y-3">
											<div class="grid grid-cols-3 gap-4">
												<div class="col-span-2 h-2 rounded bg-slate-700 dark:bg-slate-50"></div>
												<div class="col-span-1 h-2 rounded bg-slate-700 dark:bg-slate-50"></div>
											</div>
											{/* <div class="h-2 rounded bg-slate-700 dark:bg-slate-50"></div> */}
										</div>
									</div>
								</div>
							</div>
						</Fragment>
					),
				},
			});
			var chatHistory = "";
			chatList.map((el, i) => {
				if (el.loading == false && el?.id) {
					if (el.from == "system") {
						chatHistory += `\n
System: ${el.msg?.props?.children?.props?.children}`;
					} else {
						chatHistory += `\n
User: ${el.msg.props.children}`;
					}
				}
			});
			const postData = {
				apiKey: process.env.REACT_APP_API_KEY,
				data: {
					searchTerm: msg,
					UserName: UserName,
					systemId: 0,
					ChapterId: 7,
					chatHistory: chatHistory,
				},
			};

			let EndPointURL = "";
			process.env.REACT_APP_CURRENT_ENV == "test" ? (EndPointURL = process.env.REACT_APP_CHAT_URL_TEST) : (EndPointURL = process.env.REACT_APP_CHAT_URL_PROD);
			fetch(EndPointURL, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(postData),
			})
				.then((response) => {
					if (!response.body) {
						throw new Error("Response body is not a ReadableStream.");
					}
					const reader = response.body.getReader();
					const decoder = new TextDecoder();

					const processStream = async () => {
						try {
							setChatList({
								type: "removeLoading",
								payload: {},
							});
							setChatList({
								type: "add",
								payload: {
									loading: false,
									from: "system",
									msg: "",
									type: "",
								},
							});
							while (true) {
								const { done, value } = await reader.read();
								if (done) {
									break;
								}
								const chunk = decoder.decode(value);
								addChunkToState(chunk);
							}
							setChunks([]);
							setChatlistInput(false);
							setCharactersLeft(100);
						} catch (error) {
							setChatlistInput(false);
							setCharactersLeft(100);
							console.error("Error reading the stream:", error);
							var ResposeMsg = (
								<Fragment>
									<p style={{ textAlign: "right" }} dir="rtl">
										عذرا، حصل خطأ ما.
									</p>
								</Fragment>
							);
							setChatList({
								type: "removeLoading",
								payload: {},
							});
							setChatList({
								type: "add",
								payload: {
									loading: false,
									from: "system",
									msg: ResposeMsg,
									type: "",
								},
							});
						} finally {
							reader.releaseLock();
						}
					};
					processStream();
				})
				.catch((error) => {
					setChatInput({
						type: "empty",
					});
					setChatlistInput(false);
					setCharactersLeft(100);

					console.error("Fetch error:", error);
					var ResposeMsg = (
						<Fragment>
							<p style={{ textAlign: "right" }} dir="rtl">
								عذرا، حصل خطأ ما.
							</p>
						</Fragment>
					);
					setChatList({
						type: "removeLoading",
						payload: {},
					});
					setChatList({
						type: "add",
						payload: {
							loading: false,
							from: "system",
							msg: ResposeMsg,
							type: "",
						},
					});
				});
		} else {
			alert("msg cannot be empty");
			console.log("msg cannot be empty");
		}
	}

	const [lastElementIndex, setLastElementIndex] = useState(chatList?.length - 1);
	useEffect(() => {
		inputRef.current.focus();
	}, [ChatlistInput]);

	return (
		<div className="flex h-screen flex-col dark:bg-header-color">
			<Header />

			<div
				className="mb-[7rem] mt-[5.1rem] flex-1 overflow-y-auto bg-custom-white px-3 py-2 dark:bg-header-color xs:mb-[5rem]"
				ref={messagesEndRef}
				style={{ scrollBehavior: "smooth" }}
			>
				{chatList.map((el, index) => {
					if (el.from == "system") {
						return (
							<div className={`${index === lastElementIndex ? "flex flex-col items-start" : "mb-8 flex flex-col items-start"}`} dir="ltr">
								<div className="flex items-start">
									<img src={process.env.PUBLIC_URL + "/ai.png"} alt="Avatar" className="mr-1 size-10 rounded-full bg-transparent p-1" />

									<div className="min-w-[17rem] max-w-[17rem] overflow-hidden rounded-[8px]  bg-chat-bubble-100 p-3 text-right dark:bg-chat-bubble-400 xs:min-w-[22rem] xs:max-w-[22rem]">
										<p className="mb-1 whitespace-pre-line font-Tajawal text-sm/[13px] leading-24 text-chat-bubble-300 dark:text-slate-50">{el.msg}</p>
										<p className="mt-1 py-1 font-Tajawal text-sm/[8px] text-date-color-200 dark:text-date-color-400">{el.date}</p>
									</div>
								</div>
							</div>
						);
					} else {
						return (
							<div className="mb-8 flex flex-col items-start" dir="rtl">
								<div className="flex items-start">
									<img src={process.env.PUBLIC_URL + "/business-person.png"} alt="User" className="ml-1 size-10 rounded-full bg-transparent p-1" />

									<div className="min-w-[17rem] max-w-[17rem] overflow-hidden rounded-[8px] bg-chat-bubble-300 p-3  text-slate-50 dark:bg-chat-bubble-400 xs:min-w-[22rem] xs:max-w-[22rem]">
										<p className="font-Tajawa mb-1 whitespace-pre-line text-right text-sm/[13px]  leading-24 dark:text-slate-50">{el.msg}</p>
										<p className="mt-1 py-1 font-Tajawal text-sm/[8px] text-date-color-200 dark:text-date-color-400">{el.date}</p>
									</div>
								</div>
							</div>
						);
					}
				})}
			</div>

			<div className="fixed bottom-0 h-24 w-full bg-custom-white px-4 py-4 dark:bg-header-color xs:h-20 xs:border-date-color-100 xs:px-4 xs:py-4 xs:dark:border-t-[1px] xs:dark:border-date-color-400">
				<form onSubmit={(e, chatInput) => sendMsg(e, chatInput)} dir="rtl">
					<div className="flex rounded-lg shadow-sm">
						<button
							className="inline-flex h-[54px] w-[2.875rem] flex-shrink-0 cursor-pointer items-center justify-center rounded-r-[10px] bg-chat-bubble-100 disabled:opacity-50 dark:bg-chat-bubble-400"
							disabled={ChatlistInput}
						>
							<span className="inline-block h-4 w-4" onClick={(e, chatInput) => (ChatlistInput ? null : sendMsg(e, chatInput))}>
								<FaArrowUp className="text-chat-bubble-300 dark:text-slate-50" />
							</span>
							{/* {ChatlistInput ? (
								<span className="inline-block h-4 w-4 opacity-50" onClick={(e) => stopRequest(e)}>
									<FaStop className="text-chat-bubble-300 dark:text-slate-50" />
								</span>
							) : (
								<span className="inline-block h-4 w-4" onClick={(e, chatInput) => (ChatlistInput ? null : sendMsg(e, chatInput))}>
									<FaArrowUp className="text-chat-bubble-300 dark:text-slate-50" />
								</span>
							)} */}
						</button>
						<input
							disabled={ChatlistInput}
							type="text"
							value={chatInput.UserMsg}
							onChange={(e) => handleChatInput(e)}
							className="block w-full rounded-none border-none bg-chat-bubble-100 py-3 text-sm text-chat-bubble-300 placeholder:pr-2 focus-visible:outline-none disabled:opacity-50 dark:bg-chat-bubble-400 dark:text-chat-bubble-100 xs:py-0"
							placeholder="اكتب هنا ..."
							ref={inputRef}
						/>
						<span
							className={`${
								ChatlistInput
									? `inline-flex h-[54px] w-16 items-center justify-center rounded-l-[10px] bg-chat-bubble-100 text-sm text-chat-bubble-300 opacity-50 dark:bg-chat-bubble-400 dark:text-slate-50`
									: `inline-flex h-[54px] w-16 items-center justify-center rounded-l-[10px] bg-chat-bubble-100 text-sm text-chat-bubble-300  dark:bg-chat-bubble-400 dark:text-slate-50`
							}`}
						>
							{CharactersLeft}
						</span>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ChatBotUI;
