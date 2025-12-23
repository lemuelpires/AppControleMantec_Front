import styled from 'styled-components';

export const Titulo = styled.div`
	display: flex;
	width: 100%;
	justify-content: center;
	margin-bottom: 10px;

	&.orcamento-modal-titulo {
		h2 {
			color: #f1f1f1 !important;
			font-size: 1.1rem !important;
			border-bottom: 1px solid #f1f1f1 !important;
			padding-bottom: 3px !important;
			margin: 0 !important;
		}
	}
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	color: #f1f1f1;
	width: 100%;
	padding: 0;
	margin: 0;
	max-height: calc(90vh - 20px);
	overflow-y: auto;

	&.orcamento-modal-container {
		p.orcamento-not-found {
			text-align: center !important;
			margin: 10px 0 !important;
			font-size: 0.9rem !important;
		}

		.orcamento-report-wrapper {
			width: 100% !important;
			max-width: 100% !important;
			padding: 0 !important;
			margin: 0 !important;

			* {
				line-height: 1.1 !important;
				font-size: 0.85em !important;
			}

			h1 {
				font-size: 1.2rem !important;
				margin: 8px 0 6px 0 !important;
			}

			h2 {
				font-size: 1rem !important;
				margin: 6px 0 4px 0 !important;
			}

			h3 {
				font-size: 0.95rem !important;
				margin: 8px 0 4px 0 !important;
				padding-bottom: 2px !important;
			}

			p, div, span {
				font-size: 0.8rem !important;
				margin: 2px 0 !important;
				padding: 1px 0 !important;
			}

			[class*="ReportRow"], [class*="reportrow"] {
				margin-bottom: 4px !important;
				padding: 2px 0 !important;
			}

			[class*="ReportLabel"], [class*="reportlabel"] {
				font-size: 0.75rem !important;
				font-weight: 600 !important;
			}

			[class*="ReportValue"], [class*="reportvalue"] {
				font-size: 0.75rem !important;
			}

			button {
				padding: 6px 12px !important;
				font-size: 0.8rem !important;
				margin: 0 4px !important;
			}

			[class*="ReportContainer"], [class*="reportcontainer"] {
				padding: 8px !important;
				margin: 0 !important;
				font-size: 0.8rem !important;
			}
		}
	}

	@media print {
		max-height: none;
		overflow: visible;

		&.orcamento-modal-container .orcamento-report-wrapper {
			page-break-inside: avoid;

			* {
				font-size: 10px !important;
			}
		}
	}
`;
