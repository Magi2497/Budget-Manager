import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import AmountDisplay from './AmountDisplay'
import { useBudget } from '../hooks/useBudget'
import 'react-circular-progressbar/dist/styles.css'

export default function BudgetTracker() {
  const { state, dispatch, totalExpenses, remainingBudget } = useBudget()

  const percentage = +((totalExpenses / state.budget) * 100).toFixed(2)

  const colorProgressBar = (percentage: number) => {
    if (percentage > 90) return '#DC2626'
    if (percentage > 59) return '#ffa500'
    return '#3b82f6'
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      <div className="flex justify-center">
        {/* color red: DC2626 */}
        <CircularProgressbar
          value={percentage}
          styles={buildStyles({
            pathColor: colorProgressBar(percentage),
            trailColor: '#F5F5F5',
            textSize: 8,
            textColor: '#000000',
          })}
          text={`${percentage}% Spent`}
        />
      </div>
      <div className="flex flex-col justify-center gap-8">
        <button
          type="button"
          className="bg-pink-600 w-full p-2 text-white uppercase font-bold rounded-lg"
          onClick={() =>
            dispatch({
              type: 'reset-app',
            })
          }
        >
          Reset App
        </button>

        <AmountDisplay label="Budget" amount={state.budget} />

        <AmountDisplay label="Available" amount={remainingBudget} />

        <AmountDisplay label="Spent" amount={totalExpenses} />
      </div>
    </div>
  )
}
