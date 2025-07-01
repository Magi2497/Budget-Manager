import { useMemo, useState } from 'react'
import { useBudget } from '../hooks/useBudget'

export default function BudgetForm() {
  // We define here the react state hook for budget
  const [budget, setBudget] = useState(0)

  // We use destructuring on the custom hook useBudget to extract the dispatch function of the reducer provided by the context
  const { dispatch } = useBudget()

  // handleChange allow us to edit the value of the selected input and setting the value in the use state hook budget
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBudget(e.target.valueAsNumber)
  }

  // isValid validates the form by ensuring that the user can only enter numbers greater than 0 in the input to submit
  const isValid = useMemo(() => {
    return isNaN(budget) || budget <= 0
  }, [budget])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch({ type: 'add-budget', payload: { budget } })
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div className="flex flex-col space-y-5">
        <label
          htmlFor="budget"
          className=" text-4xl text-blue-600 font-bold text-center"
        >
          Define Budget
        </label>
        <input
          id="budgetID"
          type="number"
          className="w-full bg-white border border-gray-200 p-2"
          placeholder="Define your budget"
          name="budget"
          value={budget}
          onChange={handleChange}
        />
      </div>

      <input
        type="submit"
        value="Define Budget"
        className="bg-blue-600 hover:bg-blue-700 cursor-pointer w-full p-2 text-white font-black  uppercase disabled:opacity-40"
        placeholder="Define your budget"
        name="budget"
        disabled={isValid}
      />
    </form>
  )
}
