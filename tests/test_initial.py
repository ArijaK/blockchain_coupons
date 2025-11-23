from wake.testing import *
from pytypes.contracts.Coupons import Coupon1155

# To launch a new development chain
@chain.connect()
# To connect to an existing chain
# @chain.connect("chain_uri")
def test_coupon():
    # Deploy contract
    coupon = Coupon1155.deploy()

    owner = chain.accounts[0]
    issuer = chain.accounts[1]
    other = chain.accounts[2]

    coupon.addIssuer(issuer, from_=owner)
    # Only owner can grant issuer rights
    with must_revert():
       coupon.addIssuer(other, from_=issuer)

    coupon.mint(issuer, 10, from_=issuer)
    # Only issuer can mint coupons
    with must_revert():
        coupon.mint(other, 10, from_=other)
    
    # Check balance
    print("Issuer balance:", coupon.balanceOf(issuer, 1))
    print("Other balance:", coupon.balanceOf(other, 1))

    print("Transfer 5 coupons from issuer to other")
    coupon.safeTransferFrom(
        from__=issuer,
        to_=other,
        id=1,
        value_=5,
        data=b"",
        from_=issuer
    )
    print("Issuer balance after transfer:", coupon.balanceOf(issuer, 1))
    print("Other balance after transfer:", coupon.balanceOf(other, 1))

    # Redeem 2 coupons
    coupon.redeem(1, 2, from_=other)
    print("Other balance after redeem:", coupon.balanceOf(other, 1))

