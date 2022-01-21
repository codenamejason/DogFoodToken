import { Skeleton, Typography } from "antd";
import React from "react";
import Blockies from "react-blockies";
import { useThemeSwitcher } from "react-css-theme-switcher";
import { useLookupAddress } from "eth-hooks/dapps/ens";

// changed value={address} to address={address}

/*
  ~ What it does? ~

  Displays an address with a blockie image and option to copy address

  ~ How can I use? ~

  <Address
    address={address}
    ensProvider={mainnetProvider}
    blockExplorer={blockExplorer}
    fontSize={fontSize}
  />

  ~ Features ~

  - Provide ensProvider={mainnetProvider} and your address will be replaced by ENS name
              (ex. "0xa870" => "user.eth")
  - Provide blockExplorer={blockExplorer}, click on address and get the link
              (ex. by default "https://etherscan.io/" or for xdai "https://blockscout.com/poa/xdai/")
  - Provide fontSize={fontSize} to change the size of address text
*/

const { Text } = Typography;

const blockExplorerLink = (address, blockExplorer) =>
  `${blockExplorer || "https://etherscan.io/"}${"address/"}${address}`;

export default function Address(props) {
  const address = props.value || props.address;

  const ens = useLookupAddress(props.ensProvider, address);

  const { currentTheme } = useThemeSwitcher();

  if (!address) {
    return (
      <span>
        <Skeleton avatar paragraph={{ rows: 1 }} />
      </span>
    );
  }

  let displayAddress = address.substr(0, 6);

  if (ens && ens.indexOf("0x") < 0) {
    displayAddress = ens;
  } else if (props.size === "short") {
    displayAddress += "..." + address.substr(-4);
  } else if (props.size === "long") {
    displayAddress = address;
  }

  const etherscanLink = blockExplorerLink(address, props.blockExplorer);
  if (props.minimized) {
    return (
      <span style={{ verticalAlign: "middle" }}>
        <a
<<<<<<< HEAD
          style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          <Blockies seed={address.toLowerCase()} size={8} scale={2} />
=======
          style={{ color: "#222222" }}
          target={"_blank"}
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          <Blockies seed={props.address.toLowerCase()} size={8} scale={2} />
>>>>>>> 203e7ef78411d7b95edfcaf815ff30fd18c3abee
        </a>
      </span>
    );
  }

  let text;
  if (props.onChange) {
    text = (
<<<<<<< HEAD
      <Text editable={{ onChange: props.onChange }} copyable={{ text: address }}>
        <a
          style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
=======
      <Text
        editable={{ onChange: props.onChange }}
        copyable={{ text: props.address }}
      >
        <a
          style={{ color: "#222222" }}
          target={"_blank"}
>>>>>>> 203e7ef78411d7b95edfcaf815ff30fd18c3abee
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          {displayAddress}
        </a>
      </Text>
    );
  } else {
    text = (
<<<<<<< HEAD
      <Text copyable={{ text: address }}>
        <a
          style={{ color: currentTheme === "light" ? "#222222" : "#ddd" }}
          target="_blank"
=======
      <Text copyable={{ text: props.address }}>
        <a
          style={{ color: "#222222" }}
          target={"_blank"}
>>>>>>> 203e7ef78411d7b95edfcaf815ff30fd18c3abee
          href={etherscanLink}
          rel="noopener noreferrer"
        >
          {displayAddress}
        </a>
      </Text>
    );
  }

  return (
    <span>
      <span style={{ verticalAlign: "middle" }}>
<<<<<<< HEAD
        <Blockies seed={address.toLowerCase()} size={8} scale={props.fontSize ? props.fontSize / 7 : 4} />
      </span>
      <span style={{ verticalAlign: "middle", paddingLeft: 5, fontSize: props.fontSize ? props.fontSize : 28 }}>
=======
        <Blockies
          seed={props.address.toLowerCase()}
          size={8}
          scale={props.fontSize ? props.fontSize / 7 : 4}
        />
      </span>
      <span
        style={{
          verticalAlign: "middle",
          paddingLeft: 5,
          fontSize: props.fontSize ? props.fontSize : 28
        }}
      >
>>>>>>> 203e7ef78411d7b95edfcaf815ff30fd18c3abee
        {text}
      </span>
    </span>
  );
}
