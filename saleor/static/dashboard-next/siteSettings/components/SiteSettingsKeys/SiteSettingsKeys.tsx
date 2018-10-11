import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";

import CardTitle from "../../../components/CardTitle";
import Skeleton from "../../../components/Skeleton";
import i18n from "../../../i18n";
import {
  maybe,
  renderCollection,
  translatedAuthorizationKeyTypes
} from "../../../misc";
import { ICONBUTTON_SIZE } from "../../../theme";
import { AuthorizationKeyType } from "../../../types/globalTypes";
import { SiteSettings_shop_authorizationKeys } from "../../types/SiteSettings";

interface SiteSettingsKeysProps {
  disabled: boolean;
  keys: SiteSettings_shop_authorizationKeys[];
  onAdd: () => void;
  onRemove: (name: AuthorizationKeyType) => void;
}

const decorate = withStyles(theme => ({
  iconCell: {
    "&:last-child": {
      paddingRight: 0
    },
    width: ICONBUTTON_SIZE + theme.spacing.unit / 2
  }
}));
const SiteSettingsKeys = decorate<SiteSettingsKeysProps>(
  ({ classes, disabled, keys, onAdd, onRemove }) => {
    const keyTypes = translatedAuthorizationKeyTypes();
    return (
      <Card>
        <CardTitle
          title={i18n.t("Authentication Keys", {
            context: "card title"
          })}
          toolbar={
            <Button
              color="secondary"
              disabled={disabled}
              variant="flat"
              onClick={onAdd}
            >
              {i18n.t("Add key", {
                context: "button"
              })}
            </Button>
          }
        />
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                {i18n.t("Authentication Type", { context: "table header" })}
              </TableCell>
              <TableCell>
                {i18n.t("Key", { context: "table header" })}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {renderCollection(
              keys,
              key => (
                <TableRow
                  hover={!(disabled || !key)}
                  key={maybe(() => key.name)}
                >
                  <TableCell>
                    {maybe(() => key.name) ? keyTypes[key.name] : <Skeleton />}
                  </TableCell>
                  <TableCell>
                    {maybe(() => key.key) ? key.key : <Skeleton />}
                  </TableCell>
                  <TableCell className={classes.iconCell}>
                    <IconButton onClick={() => onRemove(key.name)}>
                      <DeleteIcon color="secondary" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ),
              () => (
                <TableRow>
                  <TableCell colSpan={3}>{i18n.t("No keys")}</TableCell>
                </TableRow>
              )
            )}
          </TableBody>
        </Table>
      </Card>
    );
  }
);
SiteSettingsKeys.displayName = "SiteSettingsKeys";
export default SiteSettingsKeys;
