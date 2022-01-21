import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Card, List } from "antd";
import { Address, AddressInput } from "../components";
import { ethers } from "ethers";
import { useContractReader } from "eth-hooks";

function YourAccesories({
  DEBUG,
  readContracts,
  writeContracts,
  tx,
  mainnetProvider,
  blockExplorer,
  address,
  updateBalances,
  setUpdateBalances,
  nft,
  fancyLoogiesNfts,
  selectedFancyLoogie,
  selectedNfts,
  setSelectedNfts,
  setFancyLoogiePreviewActiveTab,
}) {
  const [nftBalance, setNftBalance] = useState(0);
  const [yourNftBalance, setYourNftBalance] = useState(0);
  const [yourNfts, setYourNfts] = useState();
  const [transferToAddresses, setTransferToAddresses] = useState({});
  const [updateNftBalance, setUpdateNftBalance] = useState(0);
  const [loadingNfts, setLoadingNfts] = useState(true);

  const nftsText = {
    Bow: '<p>Only <strong>1000 Bows</strong> available on a price curve <strong>increasing 0.2%</strong> with each new mint.</p><p>Each Bow has a <strong>random color</strong> and, if you are lucky, the bow will <strong>rotate</strong>!</p>',
    Eyelash: '<p>Only <strong>1000 Eyelashes</strong> available on a price curve <strong>increasing 0.2%</strong> with each new mint.</p><p>The Eyelash has a <strong>random color</strong>, a <strong>random length</strong> and, if you are lucky, you can get <strong>another random color for the middle eyelashes</strong>!</p>',
    Mustache: '<p>Only <strong>1000 Mustaches</strong> available on a price curve <strong>increasing 0.2%</strong> with each new mint.</p><p>Each Mustache has a <strong>random color</strong>.</p>',
    ContactLenses: '<p>Only <strong>1000 Contact Lenses</strong> available on a price curve <strong>increasing 0.2%</strong> with each new mint.</p><p>The Contact Lenses have a <strong>random color</strong> and, if you are lucky, you can get a <strong>crazy one</strong>!</p>',
  };

  const priceToMint = useContractReader(readContracts, nft, "price");
  if (DEBUG) console.log("🤗 priceToMint:", priceToMint);

  const totalSupply = useContractReader(readContracts, nft, "totalSupply");
  if (DEBUG) console.log("🤗 totalSupply:", totalSupply);
  const nftLeft = 1000 - totalSupply;

  useEffect(() => {
    const updateBalances = async () => {
      if (DEBUG) console.log("Updating balances...");
      if (readContracts[nft]) {
        const nftNewBalance = await readContracts[nft].balanceOf(address);
        const yourNftNewBalance = nftNewBalance && nftNewBalance.toNumber && nftNewBalance.toNumber();
        if (DEBUG) console.log("NFT: ", nft, " - Balance: ", nftNewBalance, " - Your: ", yourNftNewBalance);
        setNftBalance(nftNewBalance);
        setYourNftBalance(yourNftNewBalance);
      } else {
        if (DEBUG) console.log("Contracts not defined yet.");
      }
    };
    updateBalances();
  }, [address, readContracts[nft], updateNftBalance]);

  useEffect(() => {
    const updateYourCollectibles = async () => {
      const nftUpdate = [];

      setLoadingNfts(true);

      for (let tokenIndex = 0; tokenIndex < yourNftBalance; tokenIndex++) {
        try {
          const tokenId = await readContracts[nft].tokenOfOwnerByIndex(address, tokenIndex);
          if (DEBUG) console.log("Getting ", nft, " tokenId: ", tokenId);
          const tokenURI = await readContracts[nft].tokenURI(tokenId);
          if (DEBUG) console.log("tokenURI: ", tokenURI);
          const jsonManifestString = atob(tokenURI.substring(29));

          try {
            if (DEBUG) console.log("JSON: ", jsonManifestString);
            const jsonManifest = JSON.parse(jsonManifestString);
            nftUpdate.unshift({ id: tokenId, uri: tokenURI, owner: address, ...jsonManifest });
          } catch (e) {
            console.log(e);
          }
        } catch (e) {
          console.log(e);
        }
      }

      setYourNfts(nftUpdate);

      setLoadingNfts(false);
    };
    updateYourCollectibles();
  }, [address, yourNftBalance]);

  return (
    <>
      <div style={{ width: 515, marginTop: 32, paddingBottom: 32 }}>
        <div dangerouslySetInnerHTML={{ __html: nftsText[nft] }}></div>
        <Button
          type="primary"
          onClick={async () => {
            const priceRightNow = await readContracts[nft].price();
            try {
              tx(writeContracts[nft].mintItem({ value: priceRightNow, gasLimit: 300000 }), function (transaction) {
                setUpdateNftBalance(updateNftBalance + 1);
              });
            } catch (e) {
              console.log("mint failed", e);
            }
          }}
        >
          MINT for Ξ{priceToMint && (+ethers.utils.formatEther(priceToMint)).toFixed(4)}
        </Button>
        <p style={{ fontWeight: "bold" }}>
          { nftLeft } left
        </p>
      </div>

      <div style={{ width: 515, paddingBottom: 256 }}>
        <List
          bordered
          loading={loadingNfts}
          dataSource={yourNfts}
          renderItem={item => {
            const id = item.id.toNumber();
            return (
              <List.Item key={id + "_" + item.uri + "_" + item.owner}>
                <Card
                  title={
                    <div>
                      <div style={{ height: 45 }}>
                        <span style={{ fontSize: 18, marginRight: 8 }}>{item.name}</span>
                        { fancyLoogiesNfts &&
                          fancyLoogiesNfts[selectedFancyLoogie] &&
                          fancyLoogiesNfts[selectedFancyLoogie][readContracts[nft].address] == 0 && (
                          <Button
                            style={{ marginRight: 10 }}
                            disabled={ selectedNfts[nft] == id }
                            onClick={() => {
                              setSelectedNfts(prevState => ({
                                ...prevState,
                                [nft]: id,
                              }));
                              setFancyLoogiePreviewActiveTab("preview-"+nft);
                            }}
                          >
                            { selectedNfts[nft] == id ? "Previewing" : "Preview" }
                          </Button>
                        )}
                      </div>
                    </div>
                  }
                >
                  <div class="nft-image">
                    <img src={item.image} />
                  </div>
                  <div style={{ height: 90 }}>{item.description}</div>
                  <div style={{ height: 90 }}>
                    owner:{" "}
                    <Address
                      address={item.owner}
                      ensProvider={mainnetProvider}
                      blockExplorer={blockExplorer}
                      fontSize={16}
                    />
                    <AddressInput
                      ensProvider={mainnetProvider}
                      placeholder="transfer to address"
                      value={transferToAddresses[id]}
                      onChange={newValue => {
                        const update = {};
                        update[id] = newValue;
                        setTransferToAddresses({ ...transferToAddresses, ...update });
                      }}
                    />
                    <Button
                      type="primary"
                      style={{ marginTop: 10 }}
                      onClick={() => {
                        tx(writeContracts[nft].transferFrom(address, transferToAddresses[id], id), function (transaction) {
                          setUpdateNftBalance(updateNftBalance + 1);
                        });
                      }}
                    >
                      Transfer
                    </Button>
                  </div>
                </Card>
              </List.Item>
            );
          }}
        />
      </div>
    </>
  );
}

export default YourAccesories;
