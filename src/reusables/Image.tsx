import { Component } from 'react';
import styled from 'styled-components';

const ImgWrapper = styled.div<{
	width?: string;
	height?: string;
	inStock?: boolean;
	cursor?: any;
}>`
	width: ${({ width }) => width || 'fit-content'};
	height: ${({ height }) => height || 'fit-content'};
	cursor: ${({ cursor }) => cursor === 'true' && 'pointer'};
	position: relative;
	margin-left: auto;

	${({ inStock }) =>
		inStock === false &&
		`
    img {
			opacity: 0.5;
		}

		:before {
			font-size: 2rem;
			color:black;
			white-space: nowrap;
			content: 'Out of Stock';
			text-transform: uppercase;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);

		}
  `};
`;

const Img = styled.img`
	display: block;
	max-width: 100%;
	max-height: 100%;
`;

interface Props {
	children?: any;
	src: string;
	inStock?: boolean;
	width?: string;
	height?: string;
	cursor?: string;
	onClick?: (...any: any) => void;
}

class Image extends Component<Props> {
	render() {
		return (
			<ImgWrapper {...this.props}>
				<Img src={this.props.src} />
				{this.props.children}
			</ImgWrapper>
		);
	}
}

export default Image;
