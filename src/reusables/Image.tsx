import { Component } from 'react';
import styled from 'styled-components';

const ImgWrapper = styled.div<{
	mWidth?: string;
	height?: string;
	inStock?: boolean;
}>`
	max-width: ${({ mWidth }) => mWidth || '280px'};
	height: ${({ height }) => height || '280px'};
	position: relative;

	${({ inStock }) =>
		!inStock &&
		`
    img {
			opacity: 0.25;
		}

		:before {
			font-size: 1.5rem;
			white-space: nowrap;
			content: 'Out of Stock';
			text-transform: uppercase;
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
  `}
`;

const Img = styled.img`
	display: block;
	width: 100%;
	height: 100%;
`;

interface Props {
	children?: any;
	src: string;
	inStock?: boolean;
	mWidth?: string;
	height?: string;
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