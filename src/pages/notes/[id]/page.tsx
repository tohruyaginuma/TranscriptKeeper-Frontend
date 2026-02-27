import BaseLayout from "@/components/base-layout";
import TranscriptRow from "@/components/transcript-row";

const dummyData = [
	{
		id: 1,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	},
	{
		id: 2,
		text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{
		id: 3,
		text: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.			",
	},
	{
		id: 4,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	},
	{
		id: 5,
		text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{
		id: 6,
		text: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		id: 7,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	},
	{
		id: 8,
		text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{
		id: 9,
		text: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
	{
		id: 10,
		text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
	},
	{
		id: 11,
		text: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
	},
	{
		id: 12,
		text: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
	},
];

const NoteDetailPage = () => {
	return (
		<BaseLayout>
			<h1>What is Lorem Ipsum?</h1>
			{dummyData.map((item) => (
				<TranscriptRow
					key={item.id}
					text={item.text}
					hasBackground={item.id % 2 === 0}
				/>
			))}
		</BaseLayout>
	);
};

export default NoteDetailPage;
