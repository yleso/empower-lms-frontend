import moment from 'moment/moment'
import { FC } from 'react'
import { useTheme } from '@/hooks/useTheme.hook'
import Text from '@/styles/text.module.scss'
import Vars from '@/vars/vars.json'
import Styles from './certificate.module.scss'
import { CertificateInterface } from './sertificate.interface'


const CertificateIcon: FC = () => {
	return (
		<svg
			width='33'
			height='30'
			viewBox='0 0 33 30'
			fill='none'
			xmlns='http://www.w3.org/2000/svg'
		>
			<path
				d='M5.3 3.15789C4.42366 3.15789 3.7 3.87203 3.7 4.73684V20.5263C3.7 20.9451 3.86857 21.3467 4.16863 21.6428C4.46869 21.9389 4.87565 22.1053 5.3 22.1053H13.3C14.1837 22.1053 14.9 22.8122 14.9 23.6842C14.9 24.5562 14.1837 25.2632 13.3 25.2632H5.3C4.02696 25.2632 2.80606 24.7641 1.90589 23.8758C1.00571 22.9874 0.5 21.7826 0.5 20.5263V4.73684C0.5 2.12797 2.65634 0 5.3 0H27.7C28.973 0 30.1939 0.499059 31.0941 1.38739C31.9943 2.27572 32.5 3.48055 32.5 4.73684V20.5279C32.4991 21.3586 32.2769 22.1744 31.8557 22.8936C31.4344 23.6128 30.829 24.21 30.1 24.6253C29.3347 25.0613 28.3562 24.8026 27.9144 24.0474C27.4725 23.2922 27.7347 22.3265 28.5 21.8905C28.743 21.752 28.9448 21.553 29.0852 21.3132C29.2256 21.0735 29.2997 20.8016 29.3 20.5247V4.73684C29.3 4.31808 29.1314 3.91647 28.8314 3.62036C28.5313 3.32425 28.1243 3.15789 27.7 3.15789H5.3Z'
				fill={Vars['grey-primary-color']}
			/>
			<path
				fillRule='evenodd'
				clipRule='evenodd'
				d='M21.3 11.0526C17.7654 11.0526 14.9 13.8803 14.9 17.3684C14.9 18.9702 15.5042 20.4327 16.5 21.546V28.421C16.5 29.0191 16.8424 29.5658 17.3845 29.8333C17.9265 30.1008 18.5752 30.043 19.06 29.6842L21.3 28.0263L23.54 29.6842C24.0248 30.043 24.6735 30.1008 25.2155 29.8333C25.7576 29.5658 26.1 29.0191 26.1 28.421V21.546C27.0958 20.4327 27.7 18.9702 27.7 17.3684C27.7 13.8803 24.8346 11.0526 21.3 11.0526ZM18.1 17.3684C18.1 15.6244 19.5327 14.2105 21.3 14.2105C23.0673 14.2105 24.5 15.6244 24.5 17.3684C24.5 19.1125 23.0673 20.5263 21.3 20.5263C19.5327 20.5263 18.1 19.1125 18.1 17.3684ZM22.9 23.4852C22.3886 23.6151 21.8525 23.6842 21.3 23.6842C20.7475 23.6842 20.2114 23.6151 19.7 23.4852V25.2632L20.34 24.7895C20.9089 24.3684 21.6911 24.3684 22.26 24.7895L22.9 25.2632V23.4852Z'
				fill={Vars['brand-main-color']}
			/>
			<path
				d='M6.9 6.31579C6.01634 6.31579 5.3 7.02271 5.3 7.89473C5.3 8.76676 6.01634 9.47368 6.9 9.47368H26.1C26.9837 9.47368 27.7 8.76676 27.7 7.89473C27.7 7.02271 26.9837 6.31579 26.1 6.31579H6.9Z'
				fill={Vars['grey-primary-color']}
			/>
			<path
				d='M5.3 12.6316C5.3 11.7595 6.01634 11.0526 6.9 11.0526H11.7C12.5837 11.0526 13.3 11.7595 13.3 12.6316C13.3 13.5036 12.5837 14.2105 11.7 14.2105H6.9C6.01634 14.2105 5.3 13.5036 5.3 12.6316Z'
				fill={Vars['grey-primary-color']}
			/>
			<path
				d='M6.9 15.7895C6.01634 15.7895 5.3 16.4964 5.3 17.3684C5.3 18.2404 6.01634 18.9474 6.9 18.9474H10.1C10.9837 18.9474 11.7 18.2404 11.7 17.3684C11.7 16.4964 10.9837 15.7895 10.1 15.7895H6.9Z'
				fill={Vars['grey-primary-color']}
			/>
		</svg>
	)
}

const Certificate: FC<CertificateInterface> = certificate => {
	const { darkmode } = useTheme()

	const startedOn = Date.parse(String(certificate.startedOn))
	const finishedOn = Date.parse(String(certificate.finishedOn))

	const passedIn = moment(finishedOn).from(startedOn)

	return (
		<div
			className={`${Styles.Certificate} ${darkmode && Styles.CertificateDark}`}
		>
			<CertificateIcon />
			<h6 className={Text.H6Bold}>{certificate.name}</h6>
			<p className={Text.Caption1Regular}>
				Passed in&nbsp;
				{passedIn}
			</p>
		</div>
	)
}

export default Certificate