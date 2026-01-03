"use client";
import { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

interface FAQItem {
	id: number;
	question: string;
	answer: string;
}

const faqData: FAQItem[] = [
	{
		id: 1,
		question: "What is CoreDump?",
		answer:
			"CoreDump is a comprehensive coding tracking platform that helps developers monitor their progress, maintain daily streaks, compete on leaderboards.",
	},
	{
		id: 2,
		question: "How does the daily streak feature work?",
		answer:
			"The daily streak tracks your consistent coding activity. Each day you code, your streak increases. Missing a day will reset your streak to zero.",
	},
	{
		id: 3,
		question: "Can I track multiple programming languages?",
		answer:
			"Yes! CoreDump supports tracking across all major programming languages including JavaScript, Python, Java, C++, React, and many more.",
	},
	{
		id: 4,
		question: "How do leaderboards work?",
		answer:
			"Leaderboards rank users based on coding time. You can compete with developers.",
	},
	{
		id: 5,
		question: "How to show coding time on my portfolio or README?",
		answer:
			"You can use the CoreDump API to fetch your coding statistics and display them on your portfolio or README. Simply make a GET request to the public stats endpoint with your GitHub username to retrieve your coding time data.",
	},
	{
		id: 6,
		question: "How do I install the VS Code extension?",
		answer:
			"You can install the CoreDump VS Code extension directly from the VS Code marketplace.",
	},
];

const FAQ = () => {
	const [openItems, setOpenItems] = useState<number[]>([]);

	const toggleItem = (id: number) => {
		setOpenItems((prev) =>
			prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
		);
	};

	return (
		<section className="flex items-center justify-center w-full">
			<div className="flex flex-col items-center justify-center p-3 max-w-7xl w-full gap-12">
				<div className="text-center">
					<h2 className="text-4xl md:text-5xl font-semibold text-foreground font-heading mb-4 text-center">
						Frequently Asked Questions
					</h2>
				</div>

				<div className="w-full max-w-4xl">
					{faqData.map((item) => (
						<div
							key={item.id}
							className="mb-4 bg-card border border-border rounded-lg overflow-hidden"
						>
							<button
								type="button"
								onClick={() => toggleItem(item.id)}
								className="w-full flex items-center justify-between p-5 text-left"
							>
								<h3 className="text-base font-medium text-foreground font-heading pr-4">
									{item.question}
								</h3>
								<div className="flex text-foreground/80">
									{openItems.includes(item.id) ? (
										<FaChevronUp size={20} />
									) : (
										<FaChevronDown size={20} />
									)}
								</div>
							</button>

							{openItems.includes(item.id) && (
								<div className="px-5 pb-5 pt-0">
									<div className="pt-4">
										<p className="text-foreground/80 text-base font-normal leading-relaxed">
											{item.answer}
										</p>
									</div>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default FAQ;
