import { TouchableOpacity } from "react-native";
import Button from "./Button";
import Dialogs from "./Dialog";
import Text from "./Text";
import { Container } from "dripsy";
import Colors from "../../utils/Colors";

const ConfirmationModal = ({
  visible,
  toggleVisible,
  action,
  closable,
  btnParams,
  title,
  bodyText,
}) => {
  return (
    <>
      <Dialogs title={title} toggleDialog={toggleVisible} visible={visible}>
        <Container
          sx={{
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Text
            style={{
              textAlign: "center",
              padding: 10,
            }}
          >
            {bodyText}
          </Text>
          <Container>
            <Button
              type={btnParams.type}
              style={{
                padding: 12,
                marginRight: 12,
                marginLeft: 12,
                marginBottom: 8,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              textStyle={{
                color: "white",
                fontWeight: "bold",
                textAlign: "center",
                fontSize: 16,
              }}
              icon={{
                name: btnParams.icon.name,
                color: Colors.white,
              }}
              onPress={() => {
                action();
                toggleVisible(!visible);
              }}
            >
              {btnParams.btnText}
            </Button>
            {closable && (
              <Button
                type={"primary"}
                style={{
                  padding: 12,
                  marginRight: 12,
                  marginLeft: 12,
                  marginBottom: 8,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                textStyle={{
                  color: "white",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: 16,
                }}
                icon={{
                  name: "close",
                  color: Colors.white,
                }}
                onPress={() => {
                  toggleVisible(!visible);
                }}
              >
                Close
              </Button>
            )}
          </Container>
        </Container>
      </Dialogs>
    </>
  );
};

export default ConfirmationModal;
