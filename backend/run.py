# # main backend file
import sys

sys.path.append("/app/blockchain")

import time
from fastapi import FastAPI
from wake.testing import chain
from pytypes.contracts.Coupons import Coupon1155
import requests

app = FastAPI()  # must be a top-level variable

rpc_url = "http://blockchain:8545"

# for i in range(60):
#     try:
#         chain.connect_dev(anvil_url=rpc_url)
#         # chain.connect(rpc_url)
#         print(f"Connected to blockchain {i}")
#         break
#     except Exception:
#         print(f"Waiting for blockchain RPC... ({i+1}/60)")
#         time.sleep(1)
# else:
#     raise RuntimeError("Blockchain RPC not reachable")

#####################################################################
coupon = None
issuer = None


# @app.on_event("startup")
# def connect_chain():
#     global coupon, issuer

#     # Wait for blockchain RPC
#     for i in range(60):
#         try:
#             # chain.connect(rpc_url)
#             chain.connect_dev(anvil_url=rpc_url)

#             print(f"Connected to blockchain after {i+1} tries")
#             break
#         except Exception:
#             print(f"Waiting for blockchain RPC... ({i+1}/60)")
#             time.sleep(1)
#     else:
#         raise RuntimeError("Blockchain RPC not reachable")

#     # Deploy contract after connection
#     coupon = Coupon1155.deploy()
#     issuer = chain.accounts[1]

#####################################################################

# # Wait until Anvil is fully ready
# for i in range(60):
#     try:
#         resp = requests.post(
#             rpc_url,
#             json={"jsonrpc": "2.0", "method": "eth_chainId", "params": [], "id": 1},
#         )
#         if resp.ok:
#             print(f"Anvil ready after {i+1} tries")
#             break
#     except Exception:
#         pass
#     print(f"Waiting for blockchain RPC... ({i+1}/60)")
#     time.sleep(1)
# else:
#     raise RuntimeError("Blockchain RPC not reachable")

# # Now connect as a dev chain
# chain.connect(rpc_url)


################################


def wait_for_blockchain(url: str, timeout: int = 60):
    """Wait until blockchain RPC is reachable."""
    for i in range(timeout):
        try:
            response = requests.post(
                url,
                json={"jsonrpc": "2.0", "method": "eth_chainId", "params": [], "id": 1},
            )
            if response.status_code == 200:
                time.sleep(1)  # allow dev accounts to initialize

                print(f"Blockchain RPC reachable after {i+1} tries")
                return
        except requests.RequestException:
            pass
        print(f"Waiting for blockchain RPC... ({i+1}/{timeout})")
        time.sleep(1)
    raise RuntimeError("Blockchain RPC not reachable")


@app.on_event("startup")
def connect_chain():
    global coupon, issuer

    wait_for = 60

    # Wait for blockchain RPC
    wait_for_blockchain(rpc_url, wait_for)

    # Connect chain and deploy contract
    chain.connect(rpc_url)

    for i in range(wait_for):
        try:
            # Accessing chain.accounts triggers NotConnectedError until ready
            accounts = chain.accounts  # Will fail until fully initialized
            print(f"Wake chain ready after {i+1} tries")
            break
        except Exception:
            print(f"Waiting for Wake dev chain... ({i+1}/60)")
            time.sleep(1)
    else:
        raise RuntimeError("Wake dev chain not ready")

    coupon = Coupon1155.deploy()
    issuer = chain.accounts[1]

    print("Connected to blockchain and contract deployed")


@app.post("/create_coupon")
def create_coupon(amount: int):
    if coupon is None or issuer is None:
        return {"error": "Contract not ready yet"}
    coupon.mint(issuer, amount, from_=issuer)
    return {
        "contract_address": str(coupon.address),
        "coupon_id": coupon.couponIDCounter,
        "amount": amount,
    }


#####################################################################
# app = FastAPI()

# coupon = None
# issuer = None


# def rpc_is_ready(url):
#     """Return True if chain RPC responds to basic request."""
#     try:
#         chain.connect(url)
#         # Try a simple call to ensure it's live
#         _ = chain.accounts
#         return True
#     except Exception:
#         return False


# @app.on_event("startup")
# def connect_chain():
#     global coupon, issuer
#     rpc_url = "http://blockchain:8545"

#     # Wait until blockchain RPC is actually ready
#     for i in range(60):  # 60 tries ~ 60 sec
#         if rpc_is_ready(rpc_url):
#             break
#         print(f"Waiting for blockchain RPC... ({i+1}/60)")
#         time.sleep(1)
#     else:
#         raise RuntimeError("Blockchain RPC not reachable")

#     # Deploy contract after RPC is ready
#     coupon = Coupon1155.deploy()
#     issuer = chain.accounts[1]
#     print("Contract deployed and backend ready")


# from fastapi import FastAPI
# from wake.testing import chain
# from pytypes.contracts.Coupons import Coupon1155

# app = FastAPI()

# # Read blockchain RPC from environment variable
# BLOCKCHAIN_RPC = os.getenv("BLOCKCHAIN_RPC")
# chain.connect(BLOCKCHAIN_RPC)

# # Keep references for deployed contract
# coupon_instance = None
# issuer_account = None


# @app.on_event("startup")
# def connect_chain():
#     global coupon_instance, issuer_account
#     # Connect to Anvil / blockchain container

#     # Deploy coupon contract once backend starts
#     coupon_instance = Coupon1155.deploy()
#     issuer_account = chain.accounts[1]


# @app.post("/create_coupon")
# def create_coupon(amount: int):
#     global coupon_instance, issuer_account

#     if coupon_instance is None or issuer_account is None:
#         return {"error": "Blockchain not connected or contract not deployed yet."}

#     coupon_instance.mint(issuer_account, amount, from_=issuer_account)
#     return {
#         "contract_address": str(coupon_instance.address),
#         "coupon_id": coupon_instance.couponIDCounter,
#         "amount": amount,
#     }


# @app.get("/")
# def read_root():
#     return {"message": "Backend is running!"}
