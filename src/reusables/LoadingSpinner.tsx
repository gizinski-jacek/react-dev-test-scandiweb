import { Component } from 'react';
import styled from 'styled-components';

const Spinner = styled.div`
	margin: 5rem auto;
	border: 16px solid #dadada;
	border-radius: 50%;
	border-top: 16px solid #00c800;
	width: 160px;
	height: 160px;
	animation: spinner 1.5s linear infinite;

	@keyframes spinner {
		0% {
			transform: rotate(0deg);
		}

		100% {
			transform: rotate(360deg);
		}
	}
`;

class LoadingSpinner extends Component {
	render() {
		return <Spinner></Spinner>;
	}
}

export default LoadingSpinner;
