import Collapse from "@material-ui/core/Collapse"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemText from "@material-ui/core/ListItemText"
import { makeStyles } from "@material-ui/core/styles"
import ExpandLess from "@material-ui/icons/ExpandLess"
import ExpandMore from "@material-ui/icons/ExpandMore"
import React, { useState } from "react"
import { NavLink } from "react-router-dom"

const useStyles = makeStyles(theme => ({
	root: {
		width: "100%",
		padding: "15px 0",
	},
	icon: {
		marginRight: "10px",
	},
	item: {
		"&.active": {
			backgroundColor: theme.palette.primary.main,
			color: "#fff",
		},
	},
	subitem: {
		"&.active": {
			backgroundColor: theme.palette.primary.main,
			color: "#fff",
		},
	},
	nested: {
		// padding: 0,
		// paddingLeft: theme.spacing(4),
	},
	nestedLink: {
		// paddingLeft: theme.spacing(4),
	},
}))

function NavItem({ depthStep = 10, depth = 0, expanded, item, ...rest }) {
	const classes = useStyles()

	const [open, setOpen] = useState(true)
	const { href, label, items, Icon, exact } = item

	const toggleCollapse = () => {
		setOpen(!open)
	}

	return (
		<>
			<ListItem
				exact={exact}
				component={href ? NavLink : ListItem}
				to={href ? href : ""}
				onClick={toggleCollapse}
				className={classes.item}
				button
				{...rest}
			>
				{Icon && <Icon className={classes.icon} fontSize="small" />}
				<ListItemText primary={label} />
				{Array.isArray(items) ? open ? <ExpandMore /> : <ExpandLess /> : null}
			</ListItem>
			{Array.isArray(items) ? (
				<Collapse in={open} timeout="auto" unmountOnExit>
					<List disablePadding dense>
						{items.map(subItem => (
							<React.Fragment key={`${subItem.label}`}>
								{subItem === "divider" && <Divider style={{ margin: "6px 0" }} />}
								<NavItem
									className={(classes.item, classes.subitem)}
									depth={depth + 1}
									depthStep={depthStep}
									item={subItem}
									style={{ paddingLeft: `${(depth + 2) * 16}px` }}
								/>
							</React.Fragment>
						))}
					</List>
				</Collapse>
			) : null}
		</>
	)
}

let Nav = ({ items, depthStep, depth, expanded, style }) => {
	const classes = useStyles()

	return (
		<List className={classes.root}>
			{items.map(navItem => (
				<React.Fragment key={`${navItem.label}`}>
					{navItem === "divider" ? (
						<Divider style={{ margin: "4px 0" }} />
					) : (
						<NavItem
							depthStep={depthStep}
							depth={depth}
							expanded={expanded}
							item={navItem}
							style={style}
							className={classes.item}
						/>
					)}
				</React.Fragment>
			))}
		</List>
	)
}

export default Nav
