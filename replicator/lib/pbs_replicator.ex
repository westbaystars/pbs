defmodule PBSReplicator do
  @moduledoc """
  Why cook when you can use a replicator! Sadly this module can't
  provide a real replicator, but it can at least give you a simulated
  digital one. 🙂

  ## A Virtual Star Trek-style Replicator

  Replicators have a charge that gets exhausted by replicating food.
  Replicators can be recharged.

  All replicators share a single menu which is accessible and updatable via
  functions.
  """

  @type t :: %__MODULE__{
          charge: MenuItem.charge_amount(),
          menu: Map.t()
        }
  defstruct charge: 0, menu: %{}

  @doc """
  Create a new Replicator charged to a given amount.

  Replicators default to an initial charge of 100, but an alternative
  initial charge may be passed.

  ## Parammeters:

  * initial_charge (default: 100) - The replicator's initial charge.

  ## Sample:

  ```
  iex> {:ok, rep} = PBSReplicator.new(150)
  {:ok,
   %PBSReplicator{
     charge: 150,
     menu: %{
       pancakes: %MenuItem{energy_cost: 11, icon: "🥞"},
       popcorn: %MenuItem{energy_cost: 1, icon: "🍿"},
       waffles: %MenuItem{energy_cost: 15, icon: "🧇"}
     }
   }}
  ```
  """
  @spec new(MenuItem.charge_amount) :: {atom, Map.t}
  def new(initial_charge) when is_integer(initial_charge), do: {:ok,
    %__MODULE__{
      menu: initial_menu(),
      charge: initial_charge
    }
  }
  def new(_), do: new(100)

  @doc """
  Create a default-charged Replicator.

  ## Sample:

  ```
  iex> {:ok, rep} = PBSReplicator.new()
  {:ok,
   %PBSReplicator{
     charge: 100,
     menu: %{
       pancakes: %MenuItem{energy_cost: 11, icon: "🥞"},
       popcorn: %MenuItem{energy_cost: 1, icon: "🍿"},
       waffles: %MenuItem{energy_cost: 15, icon: "🧇"}
     }
   }}
  ```
  """
  @spec new() :: {:ok, Map.t}
  def new(), do: new(100)

  @doc """
  Get the replicator's current charge level.

  ## Parammeters:

  * replicator - The replicator to check.

  ## Sample:

  ```
  iex> {:ok, charge} = PBSReplicator.get_charge(rep)
  {:ok, 150}
  ```
  """
  def get_charge(replicator), do: {:ok, replicator.charge}

  @doc """
  Recharge the replicator's current charge level.

  ## Parammeters:

  * replicator - The replicator to recharge.
  * charge_amount - The amount to charge.

  ## Sample:

  ```
  iex> {:ok, rep} = PBSReplicator.recharge(rep, 75)
  {:ok,
   %PBSReplicator{
     charge: 225,
     menu: %{
       pancakes: %MenuItem{energy_cost: 11, icon: "🥞"},
       popcorn: %MenuItem{energy_cost: 1, icon: "🍿"},
       waffles: %MenuItem{energy_cost: 15, icon: "🧇"}
     }
   }}
  ```
  """
  def recharge(replicator, charge_amount) when is_integer(charge_amount), do: {:ok,
    %__MODULE__{
      charge: replicator.charge + charge_amount,
      menu: replicator.menu
    }
  }
  def charge(_, _), do: {:error, reason: "Charge amount must be an integer."}

  @doc """
  Get the menu of foods supported by the replicator.

  ## Parammeters:

  * replicator - The replicator to get the menu from.

  ## Sample:

  ```
  iex> {:ok, menu} = PBSReplicator.get_menu(rep)
  {:ok,
   %{
     pancakes: %MenuItem{energy_cost: 11, icon: "🥞"},
     popcorn: %MenuItem{energy_cost: 1, icon: "🍿"},
     waffles: %MenuItem{energy_cost: 15, icon: "🧇"}
   }}
  ```
  """
  def get_menu(replicator), do: {:ok, replicator.menu}

  @doc """
  Add a `MenuItem` to the replicator's menu.

  ## Parammeters:

  * replicator - The replicator to recharge.
  * {name, icon, energy_cost} - A `Tuple` of the name, icon, and energy cost of the new item.

  ## Sample:

  ```
  iex> {:ok, rep} = PBSReplicator.add_menu_item(rep, {:tako, "🐙", 9})
  {:ok,
   %PBSReplicator{
     charge: 225,
     menu: %{
       pancakes: %MenuItem{energy_cost: 11, icon: "🥞"},
       popcorn: %MenuItem{energy_cost: 1, icon: "🍿"},
       tako: %MenuItem{energy_cost: 9, icon: "🐙"},
       waffles: %MenuItem{energy_cost: 15, icon: "🧇"}
     }
   }}
  ```
  """
  def add_menu_item(replicator, {name, icon, energy_cost}) when is_integer(energy_cost), do: {:ok,
    %__MODULE__{
      charge: replicator.charge,
      menu: Map.merge(replicator.menu, %{name => MenuItem.new(energy_cost, icon)})
    }
  }

  @doc """
  Make some food from the menu.

  ## Parammeters:

  * replicator - The replicator to use.
  * {name, count} - A `Tuple` of the name of the item to make and the number of items (default: 1).

  ## Returns

  Returns the Tuple {:ok, replicator, food} if successful, {:error, reason} if fails.

  ## Sample:

  ```
  iex> {:ok, rep, food} = PBSReplicator.replicate(rep, {:tako, 3})
  {:ok, %PBSReplicator{charge: 198, ...]}, "🐙🐙🐙"}
  ```
  """
  def replicate(replicator, {item, num}) when is_integer(num) do
    {:ok, menu} = get_menu(replicator)
    order = menu
    |> Map.get(item)
    |> process_order(num, replicator.charge)

    case order do
      {:error, reason} -> {:error, reason}
      {food, cost} -> {
        :ok,
        %PBSReplicator{replicator | charge: replicator.charge - cost},
        food
      }
      _ -> {:error, "Unknown error occurred."}
    end
  end

  defp process_order(nil, _num, _charge), do: {:error, "Unknown food item."}
  defp process_order(menu_item, num, charge) do
    cond do
      menu_item.energy_cost * num > charge -> {:error, "Insufficient charge available."}
      true -> {String.duplicate(menu_item.icon, num), menu_item.energy_cost * num}
    end
  end

  defp initial_menu(), do: %{
           pancakes: %MenuItem{
             energy_cost: 11,
             icon: "🥞"
           },
           waffles: %MenuItem{
             energy_cost: 15,
             icon: "🧇"
           },
           popcorn: %MenuItem{
             energy_cost: 1,
             icon: "🍿"
           }
         }
end
