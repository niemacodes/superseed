import {
    useAccount,
    useEnsAvatar,
    useEnsName,
    useDisconnect,
  } from "@web3modal/react";
  
  import {
    DisconnectBtnStyle,
    ProfileCardStyle,
    AvatarStyle,
    ContainerStyle,
    ProfileContainerStyle,
    EnsNameStyle,
    DetailsConatinerStyle,
    PhotosConatinerStyle,
    FriendsConatinerStyle,
    BgImageStyle,
    AvatarContainer,
    BioContainer,
    BioStyle,
  } from "./styles";
  
  function Profile() {
    const disconnect = useDisconnect();
    const { address: userAddress } = useAccount();
    const { data: ensName, isLoading: isLoadingEnsName } = useEnsName({
      address: userAddress,
    });
    const { data: avatarImage, isLoading: isLoadingAvatarImage } = useEnsAvatar({
      addressOrName: userAddress,
    });
  
    return (
      <div className={ContainerStyle}>
        {avatarImage === undefined || isLoadingAvatarImage || isLoadingEnsName ? (
          <h1>Loading</h1>
        ) : (
          <div className={ProfileContainerStyle}>
            <button
              onClick={disconnect}
              type="button"
              className={DisconnectBtnStyle}
            >
              Disconnect
            </button>
          </div>
        )}
      </div>
    );
  }
  
  export default Profile;