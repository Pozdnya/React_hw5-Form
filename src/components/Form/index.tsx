/* eslint-disable array-callback-return */
/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react'
import style from './style.module.scss'
import classnames from 'classnames'



type Pay = "cash" | "card" | "checkbook"
type payType = {
	key: Pay,
	text: string,
	isChecked: boolean
}[]


const Form: React.FC = () => {
	const nameForGreenBorder = "Поздняков Кирилл"
	const [name, setName] = useState('')
	const [phone, setPhone] = useState('')
	const [adress, setAdress] = useState('')
	const [pay, setPay] = useState<Pay>('card')
	const [agreeWithPolicy, isAgreeWithPolicy] = useState(false)
	const policyText = 'Agree with the policy'
	const order = "Order"
	const formData = [
		{ key: 'name', text: 'Name', value: name, setValue: setName },
		{ key: 'phone', text: 'Phone', value: phone, setValue: setPhone },
		{ key: 'adress', text: 'Adress', value: adress, setValue: setAdress, cols: 33, rows: 12 }
	]
	const payBlock: payType = [
		{ key: 'cash', text: 'Cash', isChecked: pay === 'cash' },
		{ key: 'card', text: 'Card', isChecked: pay === 'card' },
		{ key: 'checkbook', text: 'Checkbook', isChecked: pay === 'checkbook' }
	]

	const orderFormSubmitHandler = (event: React.FormEvent<HTMLFormElement>, ) => {
		//костыльно, есть два варианта решения, либо как описано ниже, либо ставить required={true} на каждый тег
		if (!name) alert('Missing Name')
		if (!phone) alert('Missing Phone')
		if (!adress) alert('Missing Adress')
		if (!agreeWithPolicy) alert('You must agree with Policy')
		else alert('Order was confirmed');

		// вариант 1
		//(name && phone && adress && agreeWithPolicy) ? event.stopPropagation() : event.preventDefault() //не возвращается к дефолтному/пустому значению
		// вариант 2
		if (name && phone && adress && agreeWithPolicy) {
			setName('')
			setPhone('')
			setAdress('')
			isAgreeWithPolicy(false)
			event.preventDefault()
		}
		event.preventDefault()
	}

	return (
		<form action="" className={style.form} onSubmit={orderFormSubmitHandler}>
			{
				formData.map(item => (
					<React.Fragment key={item.key}>
						{item.key === 'name' ?
							<>
								<label htmlFor={item.key}>{item.text}</label>
								<input
									type="text"
									id={item.key}
									value={item.value}
									// required={true}
									className={
										classnames(
											style.input,
											{ [style.Error]: !item.value.length },
											{ [style.greenborder]: item.value === nameForGreenBorder }//Имя вводил руками или копированием и подсветка появлялась
										)}
									onChange={event => item.setValue(event.target.value)}
								/>
							</>
							: null}
						{item.key === 'phone' ?
							<>
								<label htmlFor={item.key}>{item.text}</label>
								<input
									type="tel"
									id={item.key}
									value={item.value}
									// required={true}
									className={classnames(style.input, { [style.Error]: !item.value.length })}
									onChange={event => item.setValue(event.target.value)}
								/>
							</> : null}
						{item.key === 'adress' ?
							<>
								<textarea
									name={item.key}
									id={item.key}
									cols={item.cols}
									rows={item.rows}
									placeholder={item.text}
									// required={true}
									className={classnames(style.textarea, { [style.Error]: !item.value.length })}
									onChange={event => item.setValue(event.target.value)}
								>
								</textarea>
							</> : null
						}
					</React.Fragment>
				))
			}
			<div className={style.payBlock}>
				{
					payBlock.map(item => (
						<React.Fragment key={item.key}>

							<label htmlFor={item.key} className={style['label-input']}>
								<input
									id={item.key}
									type="radio"
									onChange={() => setPay(item.key)}
									value={item.key}
									checked={item.isChecked}
								/>
								{item.text}</label>
						</React.Fragment>
					))
				}
			</div>
			<div className={style.policy}>
				<label htmlFor="policy" >
					<input
						type="checkbox"
						name="policy"
						id="policy"
						// required={true}
						onChange={() => isAgreeWithPolicy(!agreeWithPolicy)}
						checked={agreeWithPolicy}
					/>{policyText}
				</label>
			</div>
			<button type="submit" className={style.submit}>{order}</button>
		</form >
	)
}

export default React.memo(Form)