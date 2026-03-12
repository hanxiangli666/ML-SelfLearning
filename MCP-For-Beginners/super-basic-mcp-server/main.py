from mcp.server.fastmcp import FastMCP
import time
import logging

try:
    from mcp.server.fastmcp import Context as MCPContext
except ImportError:
    MCPContext = None

mcp = FastMCP("add_integers")

class MCPError(Exception):
    def __init__(self, code: int, message: str):
        self.code = code
        self.message = message
        super().__init__(f"MCPError {code}: {message}")

logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s',
    filename='mcp_server.log', # This line tells it to log to a file named 'mcp_server.log'
    filemode='a' # This line tells it to append to the log file instead of overwriting it each time the server starts
)

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)

if not any(isinstance(h, logging.FileHandler) and getattr(h, 'baseFilename', '').endswith('mcp_server.log') for h in logger.handlers):
    file_handler = logging.FileHandler('mcp_server.log', mode='a', encoding='utf-8')
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s'))
    logger.addHandler(file_handler)

logger.propagate = False


@mcp.tool()
def add(a: int, b: int) -> int:
    '''
    Adds two integers together and returns the result.

    Args:
        a (int): The first integer to add.
        b (int): The second integer to add.

    Returns:
        int: The sum of the two integers.
    '''
    logger.info(f"Adding {a} and {b}")
    result = a + b
    logger.info(f"Result: {result}")
    return result



@mcp.tool()
def divide(a: int, b: int) -> float:
    '''
    Divides one integer by another and returns the result.

    Args:
        a (int): The numerator.
        b (int): The denominator.

    Returns:
        float: The result of the division.
    '''
    if b == 0:
        raise MCPError(code=400, message="Cannot divide by zero.")
    return a / b

@mcp.tool()
def long_process(steps: int):
    '''
    Simulates a long-running process by sleeping for a specified number of steps.

    Args:
        steps (int): The number of steps to simulate. Each step takes 0.1 second.
    '''
    for i in range(steps):
        print(f"Step {i + 1}/{steps}...")
        time.sleep(0.1)
    return "Process completed!"

if __name__ == "__main__":
    mcp.run(transport='stdio')