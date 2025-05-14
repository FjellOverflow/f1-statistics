import type { ReactNode } from "react";
import Footer, { type FooterProps } from "../components/Footer";
import Header, { type HeaderProps } from "../components/Header";

export interface BasicTemplateProps {
	header?: HeaderProps;
	footer?: FooterProps;
	backgroundColorHex?: `#${string}`;
	children?: ReactNode;
}

export default function BasicTemplate({
	children,
	header,
	footer,
	backgroundColorHex = "#E10600",
}: BasicTemplateProps): ReactNode {
	return (
		<div
			style={{
				backgroundColor: backgroundColorHex,
				display: "flex",
				height: "100%",
				width: "100%",
				flexDirection: "column",
			}}
		>
			<div
				style={{
					display: "flex",
					padding: "32px",
					color: header?.textColorHex || "#FFFFFF",
				}}
			>
				<Header {...header} />
			</div>

			<div
				style={{
					display: "flex",
				}}
			>
				{children}
			</div>

			<div
				style={{
					marginTop: "auto",
					display: "flex",
					padding: "32px",
				}}
			>
				<Footer {...footer} />
			</div>
		</div>
	);
}
