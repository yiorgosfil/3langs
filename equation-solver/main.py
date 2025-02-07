from abc import ABC, abstractmethod
import re 

# Abstract Base Class for Equations
class Equation(ABC):
    """Abstract base class for mathematical equations of different degrees"""

    degree: int # The degree of the equation (e.g. 1 for linear, 2 for quadratic)
    type: str # Type of the equation as a descriptive string

    def __init__(self, *args):
        """
        Initializes the equation with coefficients
        :param args: Coefficients of the polynomial equation 
        :raises TypeError: If the number of coefficients is incorrect
        :raises TypeError: If the coefficients or are not numbers
        :raises ValueError: If the highest degree coefficient is zero
        """
        if (self.degree + 1) != len(args):
            raise TypeError(f'"Equation" object takes {self.degree + 1} positional arguments but {len(args)} were given')
        if any(not isinstance(arg, (int, float)) for arg in args):
            raise TypeError('Coefficients must be of type "int" or "float"')
        if args[0] == 0:
            raise ValueError('Highest degree coefficient must be different from zero')

        # Store coefficients in a dict where keys are exponent values 
        self.coefficients = {(len(args) - n - 1): arg for n, arg in enumerate(args)}

    def __init_subclass__(cls):
        """
        Enforces that the subclasses define the required attributes 'degree' and 'type'
        :raises AttributeError: If a subclass does not define 'degree' or 'type'
        """
        if not hasattr(cls, 'degree'):
            raise AttributeError(f'Cannot create "{cls.__name__}" class: missing required attribute "degree"')
        if not hasattr(cls, 'type'):
            raise AttributeError(f'Cannot create "{cls.__name__}" class: missing required attribute "type"')

    def __str__(self):
        """            
        Converts the equation in a human-readable string format
        :return: A formatted string representing the equation
        """
        terms = []
        for n, coefficient in self.coefficients.items():
            if not coefficient:
                continue # Skip zero coefficients
            if n == 0:
                terms.append(f'{coefficient:+}') # `:+` is a format specifier that ensures the coefficient is displayed with a sign (+/-)
            elif n == 1:
                terms.append(f'{coefficient:+}x')
            else:
                terms.append(f'{coefficient:+}x**{n}')

        equation_string = ' '.join(terms) + ' =0'

        #Return unnecessary "+1x" and return the cleaned string
        return re.sub(r"(?<!\d)1(?=x)", "", equation_string.strip("+"))

    @abstractmethod
    def solve(self):
        """Abstract method to solve the equation. Must be implemented by subclasses
        NOTE: The method has no implementation in the abstract class - it's just a placeholder
        """
        pass

    @abstractmethod
    def analyze(self):
        """Abstract method to analyze the equation's properties. Must be implemented in sublcasses"""
        pass


# Subclass for linear equations 
class LinearEquation(Equation):
    """Represents a linear equation of the form ax + b = 0 """
    degree = 1
    type = 'Linear Equation'

    def solve(self):
        """
        Solves the linear equation
        :return: A list containing a single solution
        """

        a, b = self.coefficients.values()
        x = -b / a 
        return [x]

    def analyze(self):
        """
        Returns the slope and intercept of the linear equation 
        :return: A dictionary containing slope and intercept
        """
        slope, intercept = self.coefficients.values()
        return {'slope': slope, 'intercept': intercept}


# Subclass for quadratic equations
class QuadraticEquation(Equation):
    """ Represents a quadratic equation of the form ax^2 + bx + c = 0 """
    degree = 2
    type = 'Quadratic Equation'

    def __init__(self, *args):
        """
        Initializes a quadratic equation and computes the discriminant
        NOTE: The discriminant tells us the nature of the roots (e.g. D > 0 -> tho distinct real roots
        :param args: Coefficients a, b, c of the quadratic equation
        """
        super().__init__(*args)
        a, b, c = self.coefficients.values()
        self.delta = b**2 - 4 * a * c # Calculate the discriminant

    def solve(self):
        """
        Solves the quadratic equation with the quadratic formula
        :return: A list containing real solutions or an empty list if no real roots exist
        """
        if self.delta < 0:
            return [] # No real roots

        # We unpack the first 2 values and store them into a, b and ignore the third value
        a, b, _ = self.coefficients.values() 
        x1 = (-b + (self.delta) ** 0.5) / (2 * a)
        x2 = (-b - (self.delta) ** 0.5) / (2 * a)

        return [x1] if self.delta == 0 else [x1, x2]

    def analyze(self):
        """
        Analyzes the quadratic equation to determine vertex and concavity
        Where coefficient a is the concavity, and vertex is the highest/lowest point of the parabola
        :return: A dictionary containing vertex and concavity details
        """
        a, b, c = self.coefficients.values()
        x = -b / (2 * a) # Vertex x-coordinate
        y = a * x**2 + b * x + c # Vertex y-coordinate
        concavity = 'upwards' if a > 0 else 'downwards'
        min_max = 'min' if a > 0 else 'max'

        return {'x': x, 'y': y, 'min/max': min_max, 'concavity': concavity}

# TODO: Function to solve and dislay equation information


