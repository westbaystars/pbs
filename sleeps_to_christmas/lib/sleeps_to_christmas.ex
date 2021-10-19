defmodule SleepsToChristmas do
  import Date

  @moduledoc """
  Documentation for `SleepsToChristmas`.
  """

  @doc """
  Elixir implementation of Sleeps to Christmas project.

  ## To execute:

      iex> SleepsToChristmas.sleeps()
      67 sleeps 😴 till Christmas 🎄

  """
  def sleeps do
    days = days_to_next_christmas()
    case days do
      0 -> "No more sleeps — it's Christmas 😀🎄🎁"
      1 -> "The sleep 😴 before Christmas 🎄"
      _ -> "#{days} sleeps 😴 till Christmas 🎄"
    end
  end

  defp days_to_next_christmas() do
    today = local_date()
    christmas = new!(today.year, 12, 25)
    cond do
      :gt == compare(christmas, today) -> christmas
      true -> new!(today.year + 1, 12, 25)
    end
    day_of_year(christmas) - day_of_year(today)
  end

  defp local_date() do
    {erl_date, _erl_time} = :calendar.local_time()
    from_erl!(erl_date)
  end
end
